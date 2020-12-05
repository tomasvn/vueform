import { computed, ref, watch } from 'composition-api'
import checkDateFormat from '../../../utils/checkDateFormat'
import normalize from './../../../utils/normalize'

const base = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const default_ = dependencies.default
  const nullValue = dependencies.nullValue

  // ============== COMPUTED ===============

  /**
   * Helper property used to store the element value.
   * 
   * @type {object}
   * @default null
   */
  const currentValue = ref(default_ !== undefined ? _.clone(default_.value) : null)

  /**
   * Helper property used to store the element previous value.
   * 
   * @type {object}
   * @default null
   */
  const previousValue = ref(nullValue !== undefined ? _.clone(nullValue.value) : null)

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val
    }
  })

  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   */
  const model = computed({
    get() {
      return value.value
    },
    set(val) {
      value.value = val
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}

const checkbox = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const trueValue = dependencies.trueValue
  const falseValue = dependencies.falseValue
  const { previousValue, currentValue } = base(props, context, dependencies)

  // ============== COMPUTED ==============

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return model.value ? trueValue.value : falseValue.value
    },
    set(val) {
      model.value = val == trueValue.value
    }
  })

  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   * @ignore
   */
  const model = computed({
    get() {
      return currentValue.value == trueValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)

      currentValue.value = val ? trueValue.value : falseValue.value
    }
  })

  return {
    value,
    model,
    previousValue,
    currentValue,
  }
}

const checkboxgroup = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const { previousValue, currentValue, model } = base(props, context, dependencies)

  // ============== PRIVATE ================

  const toStringArray = (val) => {
    return _.map(val, v => String(v))
  }

  // ============== COMPUTED ===============

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return toStringArray(currentValue.value)
    },
    set(val) {
      previousValue.value = toStringArray(currentValue.value)
      currentValue.value = toStringArray(val)
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}

const date = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const valueFormat = dependencies.valueFormat
  const nullValue = dependencies.nullValue
  const { currentValue, previousValue } = base(props, context, dependencies)

  // ============== COMPUTED ===============

  // Is always a Date instance
  const model = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      if (!_.isEmpty(val) && !(val instanceof Date)) {
        throw new Error('Date model must be an instance of `Date`')
      }
      
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val
    }
  })

  const value = computed({
    get() {
      // If model is empty or no need to convert return Date instance
      if (!model.value || valueFormat.value === false) {
        return model.value
      }

      return moment(model.value).format(valueFormat.value)
    },
    set(val) {
      if (_.isEmpty(val) && !(val instanceof Date)) {
        model.value = nullValue.value
        return
      }

      checkDateFormat(valueFormat.value, val)

      model.value = val instanceof Date ? val : moment(val, valueFormat.value, true).toDate()
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}

const dates = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const valueFormat = dependencies.valueFormat
  const { currentValue, previousValue } = date(props, context, dependencies)

  // ============== COMPUTED ===============

  // Is always a Date instance
  const model = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      if (!_.isArray(val)) {
        throw new Error('Dates model must an array')
      }

      _.each(val, (v) => {
        if (!_.isEmpty(v) && !(v instanceof Date)) {
          throw new Error('Date model must be an array of `Date` instances')
        }
      })
      
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val
    }
  })

  const value = computed({
    get() {
      if (valueFormat.value === false) {
        return model.value
      }

      return _.map(model.value, (val) => {
        return moment(val).format(valueFormat.value)
      })
    },
    set(val) {
      if (!_.isArray(val)) {
        throw new Error('Dates value must an array')
      }

      model.value = _.map(val, (v) => {
        checkDateFormat(valueFormat.value, v)

        return v instanceof Date ? v : moment(v, valueFormat.value, true).toDate()
      })
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}

const list = function(props, context, dependencies)
{

  // ============ DEPENDENCIES ============

  const { previousValue, currentValue } = base(props, context, dependencies)

  const child$ = dependencies.child$

  // ============== COMPUTED ===============

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      let value = []

      _.each(child$.value, (element$) => {
        value.push(element$.value)
      })

      return value
    },
    set(val) {
      throw new Error('A list element\'s value cannot be set directly. Use .update() or .load() method.')
    }
  })

  watch(value, (newValue, oldValue) => {
    currentValue.value = newValue
    previousValue.value = oldValue
  }, { flush: 'post' })

  return {
    value,
    previousValue,
    currentValue,
  }
}

const multilingual = function(props, context, dependencies)
{
  // ============ DEPENDENCIES =============

  const default_ = dependencies.default
  const nullValue = dependencies.nullValue
  const language = dependencies.language

  // ============== COMPUTED ===============

  /**
   * Helper property used to store the element value.
   * 
   * @type {object}
   * @default null
   */
  const currentValue = ref(default_ !== undefined ? _.clone(default_.value) : {})

  /**
   * Helper property used to store the element previous value.
   * 
   * @type {object}
   * @default null
   */
  const previousValue = ref(nullValue !== undefined ? _.clone(nullValue.value) : {})

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val
    }
  })

  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   */
  const model = computed({
    get() {
      return value.value[language.value]
    },
    set(val) {
      value.value = Object.assign({}, value.value, {
        [language.value]: val,
      })
    }
  })

  return {
    // Computed
    value,
    model,
    previousValue,
    currentValue,
  }
}

const multiselect = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const isNative = dependencies.isNative
  const { previousValue, currentValue, value, selectOptions, getOption } = select(props, context, dependencies)

  // ============== COMPUTED ==============
  
  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   * @ignore
   */
  const model = computed({
    get() {
      let values = value.value === null ? [] : value.value

      if (!isNative.value) {
        values = []

        _.each(value.value, (option) => {
          values.push(getOption(option))
        })
      }

      return values
    },
    set(val) {
      let values = val

      if (!isNative.value) {
        values = []

        _.each(val, (option) => {
          values.push(option.value)
        })
      }

      value.value = values
    }
  })

  return {
    value,
    model,
    previousValue,
    currentValue,
    selectOptions,

    getOption,
  }
}

const object = function(props, context, dependencies)
{

  // ============ DEPENDENCIES ============

  const { previousValue, currentValue } = base(props, context, dependencies)

  const children$ = dependencies.children$

  // ============== COMPUTED ===============

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      var value = {}

      _.each(children$.value, (element$) => {
        value = Object.assign({}, value, element$.data)
      })

      return value
    },
    set(val) {
      throw new Error('A nested element\'s value cannot be set directly. Use .update() or .load() method.')
    }
  })

  watch(value, (newValue, oldValue) => {
    currentValue.value = newValue
    previousValue.value = oldValue
  }, { flush: 'sync' })

  return {
    value,
    previousValue,
    currentValue,
  }
}

const radio = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const radioValue = dependencies.radioValue
  const nullValue = dependencies.nullValue
  const { previousValue, currentValue } = base(props, context, dependencies)

  // ============== COMPUTED ==============

  /**
   * The value of the element.
   * 
   * @type {any}
   */
  const value = computed({
    get() {
      return model.value ? radioValue.value : nullValue.value
    },
    set(val) {
      model.value = val == radioValue.value
    }
  })

  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   * @ignore
   */
  const model = computed({
    get() {
      return currentValue.value == radioValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)

      currentValue.value = val ? radioValue.value : nullValue.value
    }
  })

  return {
    value,
    model,
    previousValue,
    currentValue,
  }
}

const select = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const isNative = dependencies.isNative
  const trackBy = dependencies.trackBy
  const items = dependencies.items
  const { previousValue, currentValue, value } = base(props, context, dependencies)

  // ============== COMPUTED ==============
  
  /**
   * Helper property used for tracking the field's value.
   * 
   * @type {any}
   * @ignore
   */
  const model = computed({
    get() {
      return isNative.value ? value.value : getOption(value.value)
    },
    set(val) {
      if (!_.isObject(val) && val !== null && !isNative.value) {
        throw new Error('Model "set" must be an object when using non-native type. Try `getOption` to retrieve option object.')
      }

      value.value = isNative.value || val === null ? val : val['value']
    }
  })

  /**
   * List of select options converted to an array of objects.
   * 
   * @type {array}
   */
  const selectOptions = computed(() => {
    let options = []

    _.each(items.value, (item, key) => {
      let val = key
      let label = item

      if (_.isPlainObject(item)) {
        if (item.value !== undefined) {
          val = item.value
        }

        if (item.label !== undefined) {
          label = item.label
        } else if (item[trackBy.value] !== undefined) {
          label = item[trackBy.value]
        } else {
          throw new Error('When providing an object value for SelectElement either `label` key or a key equal to `trackBy` must be present.')
        }
      }

      options.push(Object.assign({}, _.isPlainObject(item) ? item : {}, {
        value: normalize(val),
        label: label,
      }))
    })

    return options
  })

  /**
   * Retrieves the selected option.
   * 
   * @type {object}
   */
  const selectedOption = computed(() => {
    return getOption(value.value) || {}
  })

  /**
   * Retrieves the selected option's label.
   * 
   * @type {string}
   */
  const textValue = computed(() => {
    var val = getOption(value.value)

    if (val === undefined) {
      return ''
    }

    return val[trackBy.value]
  })

  // =============== METHODS ==============
  
  const getOption = (val) => {
    return _.find(selectOptions.value, { value: normalize(val) })
  }

  return {
    value,
    model,
    previousValue,
    currentValue,
    selectOptions,
    selectedOption,
    textValue,

    getOption,
  }
}

const file = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const { previousValue, currentValue, model } = base(props, context, dependencies)

  // ============== COMPUTED ==============
  
  const value = computed({
    get() {
      return currentValue.value
    },
    set(value) {
      previousValue.value = currentValue.value && currentValue.value instanceof File
        ? new File([currentValue.value], currentValue.value.name)
        : _.clone(currentValue.value)

      currentValue.value = value
    }
  })

  return {
    value,
    model,
    previousValue,
    currentValue,
  }
}

const location = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const input = dependencies.input
  const displayKey = dependencies.displayKey
  const { previousValue, currentValue, model } = base(props, context, dependencies)

  // ============== COMPUTED ==============
  
  const value = computed({
    get() {
      return currentValue.value
    },
    set(val) {
      previousValue.value = _.clone(currentValue.value)
      currentValue.value = val

      input.value.value = input.value && val && val[displayKey.value] !== undefined ? val[displayKey.value] : ''
    }
  })

  return {
    value,
    model,
    previousValue,
    currentValue,
  }
}

const group = object
const toggle = checkbox
const tags = multiselect

export {
  checkbox,
  checkboxgroup,
  date,
  dates,
  group,
  multilingual,
  multiselect,
  list,
  object,
  radio,
  select,
  tags,
  toggle,
  file,
  location,
}

export default base