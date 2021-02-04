import { computed, toRefs, onBeforeMount, onBeforeUnmount, getCurrentInstance, provide } from 'composition-api'
import useParentAssign from './../../useParentAssign'
import computedOption from './../../../utils/computedOption'

const base = function(props, context, dependencies)
{
  const { schema } = toRefs(props)
  const currentInstance = getCurrentInstance()

  // ============ DEPENDENCIES ============

  const form$ = dependencies.form$
  const {
    assignToParent,
    removeFromParent
  } = useParentAssign(props, context, {
    form$,
  })

  // ============== COMPUTED ==============

  /**
   * 
   * 
   * @type {string}
   * @default schema.type
   */
  const type = computedOption('type', schema, schema.value.type)

  /**
   * 
   * 
   * @type {boolean}
   */
  const isStatic = computed(() => {
    return false
  })

  /**
   * Determines if the element's value is a file.
   *
   * @type {boolean}
   */
  const isFileType = computed(() => {
    return false
  })

  /**
   * Determines if the element's value is an image.
   *
   * @type {boolean}
   */
  const isImageType = computed(() => {
    return false
  })

  /**
   * Determines if the element's value is an array.
   *
   * @type {boolean}
   */
  const isArrayType = computed(() => {
    return false
  })

  /**
   * 
   *
   * @type {object<Element>}
   */
  const el$ = computed(() => {
    return currentInstance.proxy
  })

  // ============== PROVIDES ==============

  /**
   * 
   *
   * @type {component<Element>}
   */
  provide('el$', el$)

  // ================ HOOKS ===============

  onBeforeMount(() => {
    assignToParent(currentInstance.proxy.$parent, assignToParent)
  })

  onBeforeUnmount(() => {
    removeFromParent(currentInstance.proxy.$parent, removeFromParent)
  })

  return {
    el$,
    type,
    isStatic,
    isFileType,
    isArrayType,
    isImageType,
  }
}

const list = function(props, context, dependencies)
{
  const {
    el$,
    type,
    isStatic,
    isFileType,
    isImageType,
  } = base(props, context, dependencies)

  // ============== COMPUTED ==============

  const isArrayType = computed(() => {
    return true
  })

  return {
    el$,
    type,
    isStatic,
    isFileType,
    isArrayType,
    isImageType,
  }
}

const file = function(props, context, dependencies)
{
  const {
    el$,
    type,
    isStatic,
    isArrayType,
    isImageType,
  } = base(props, context, dependencies)

  // ============== COMPUTED ==============

  const isFileType = computed(() => {
    return true
  })

  return {
    el$,
    type,
    isStatic,
    isFileType,
    isArrayType,
    isImageType,
  }
}

const image = function(props, context, dependencies)
{
  const {
    el$,
    type,
    isStatic,
    isArrayType,
    isFileType
  } = file(props, context, dependencies)

  // ============== COMPUTED ==============

  const isImageType = computed(() => {
    return true
  })

  return {
    el$,
    type,
    isStatic,
    isFileType,
    isArrayType,
    isImageType,
  }
}

const static_ = function(props, context, dependencies)
{
  const {
    el$,
    type,
    isArrayType,
    isFileType,
    isImageType
  } = base(props, context, dependencies)

  // ============== COMPUTED ==============

  const isStatic = computed(() => {
    return true
  })

  return {
    el$,
    type,
    isStatic,
    isFileType,
    isArrayType,
    isImageType,
  }
}

const checkboxgroup = list
const dates = list
const multiselect = list
const tags = list

export {
  list,
  checkboxgroup,
  dates,
  multiselect,
  tags,
  file,
  image,
  static_,
} 

export default base