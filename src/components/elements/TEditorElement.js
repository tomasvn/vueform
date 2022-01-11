import { onMounted, watch } from 'composition-api'
import useForm$ from './../../composables/useForm$'
import useFieldId from './../../composables/elements/useFieldId'
import useTheme from './../../composables/useTheme'
import useLayout from './../../composables/elements/useLayout'
import useInput from './../../composables/elements/useInput'
import usePath from './../../composables/elements/usePath'
import useConditions from './../../composables/useConditions'
import useLabel from './../../composables/elements/useLabel'
import useColumns from './../../composables/elements/useColumns'
import useBaseElement from './../../composables/elements/useBaseElement'
import useGenericName from './../../composables/elements/useGenericName'
import useView from './../../composables/elements/useView'
import useTemplates from './../../composables/elements/useTemplates'
import useSlots from './../../composables/elements/useSlots'
import useDisabled from './../../composables/elements/useDisabled'
import useEvents from './../../composables/useEvents'
import useHandleInput from './../../composables/elements/useHandleInput'
import useHandleError from './../../composables/elements/useHandleError'
import useLanguages from './../../composables/elements/useLanguages'
import useEditor from './../../composables/elements/useEditor'
import useHandleAlert from './../../composables/elements/useHandleAlert'

import { teditor as useData } from './../../composables/elements/useData'
import { editor as useClasses } from './../../composables/elements/useClasses'
import { multilingual as useNullValue } from './../../composables/elements/useNullValue'
import { multilingual as useValue } from './../../composables/elements/useValue'
import { multilingual as useDefault } from './../../composables/elements/useDefault'
import { multilingual as useValidation } from './../../composables/elements/useValidation'
import { multilingual as useEmpty } from './../../composables/elements/useEmpty'
import { multilingual as useWatchValue } from './../../composables/elements/useWatchValue'

import BaseElement from './../../mixins/BaseElement'
import HasView from './../../mixins/HasView'
import HasChange from './../../mixins/HasChange'
import HasData from './../../mixins/HasData'
import HasValidation from './../../mixins/HasValidation'

export default {
  name: 'TEditorElement',
  mixins: [BaseElement, HasView, HasChange, HasData, HasValidation],
  emits: ['change', 'alert', 'error', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeUnmount', 'unmounted'],
  props: {
    type: {
      required: false,
      type: [String],
      default: 't-editor',
      private: true,
    },
    default: {
      required: false,
      type: [Object, String, Number],
      default: null
    },
    debounce: {
      required: false,
      type: [Number],
      default: null
    },
    disabled: {
      required: false,
      type: [Boolean],
      default: false
    },
    id: {
      required: false,
      type: [String],
      default: null
    },
    placeholder: {
      required: false,
      type: [String],
      default: null
    },
    onError: {
      required: false,
      type: [Function],
      default: null,
      private: true,
    },
    onAlert: {
      required: false,
      type: [Function],
      default: null,
      private: true,
    },
    accept: {
      required: false,
      type: [Array],
      default: null
    },
    acceptMimes: {
      required: false,
      type: [Array],
      default: null
    },
    endpoint: {
      required: false,
      type: [String],
      default: null,
      '@default': 'config.endpoints.attachment.url',
    },
    method: {
      required: false,
      type: [String],
      default: null,
      '@default': 'config.endpoints.attachment.method',
    },
  },
  setup(props, context) {
    const form$ = useForm$(props, context)
    const theme = useTheme(props, context)
    const layout = useLayout(props, context)
    const input = useInput(props, context)
    const path = usePath(props, context)
    const disabled = useDisabled(props, context)

    const fieldId = useFieldId(props, context, {
      path: path.path,
    })

    const events = useEvents(props, context, {}, {
      events: context.emits,
    })

    const baseElement = useBaseElement(props, context, {
      form$: form$.form$,
      fire: events.fire,
    })

    const languages = useLanguages(props, context, {
      form$: form$.form$,
    })

    const nullValue = useNullValue(props, context, {
      languages: languages.languages,
    })

    const default_ = useDefault(props, context, {
      nullValue: nullValue.nullValue,
      form$: form$.form$,
      dataPath: path.dataPath,
      parent: path.parent,
    })

    const value = useValue(props, context, {
      defaultValue: default_.defaultValue,
      language: languages.language,
      dataPath: path.dataPath,
      form$: form$.form$,
      parent: path.parent,
    })

    const conditions = useConditions(props, context, {
      form$: form$.form$,
      path: path.path,
    })

    const validation = useValidation(props, context, {
      form$: form$.form$,
      path: path.path,
      language: languages.language,
      languages: languages.languages,
      value: value.value,
    })

    const data = useData(props, context, {
      form$: form$.form$,
      available: conditions.available,
      value: value.value,
      model: value.model,
      resetValidators: validation.resetValidators,
      defaultValue: default_.defaultValue,
      nullValue: nullValue.nullValue,
      language: languages.language,
      input: input.input,
    })

    const empty = useEmpty(props, context, {
      value: value.value,
      nullValue: nullValue.nullValue,
      language: languages.language,
    })

    const label = useLabel(props, context, {
      form$: form$.form$,
      el$: baseElement.el$,
    })

    const genericName = useGenericName(props, context, {
      label: label.label,
      form$: form$.form$,
    })
    
    const templates = useTemplates(props, context, {
      theme: theme.theme,
      form$: form$.form$
    })

    const editor = useEditor(props, context, {
      form$: form$.form$,
      input: input.input,
    })

    const classes = useClasses(props, context, {
      form$: form$.form$,
      theme: theme.theme,
      isDisabled: disabled.isDisabled,
      focused: editor.focused,
      templates: templates.templates,
      el$: baseElement.el$,
    })

    const columns = useColumns(props, context, {
      form$: form$.form$,
      theme: theme.theme,
      hasLabel: label.hasLabel,
    })

    const view = useView(props, context, {
      available: conditions.available,
      active: baseElement.active,
    })

    const slots = useSlots(props, context, {
      form$: form$.form$,
      el$: baseElement.el$,
      templates: templates.templates,
    }, {
      slots: [
        'label', 'info', 'description',
        'before', 'between', 'after',
      ]
    })

    const handleInput = useHandleInput(props, context, {
      model: value.model,
    })

    const handleAlert = useHandleAlert(props, context, {
      fire: events.fire,
      listeners: events.listeners,
    })

    const handleError = useHandleError(props, context, {
      fire: events.fire,
      listeners: events.listeners,
    })

    useWatchValue(props, context, {
      form$: form$.form$,
      value: value.value,
      fire: events.fire,
      dirt: validation.dirt,
      validateLanguage: validation.validateLanguage,
      language: languages.language,
    })

    onMounted(() => {
      validation.initState()
      validation.initMessageBag()
      validation.initValidation()
    })

    return {
      ...form$,
      ...fieldId,
      ...theme,
      ...layout,
      ...input,
      ...path,
      ...conditions,
      ...value,
      ...validation,
      ...label,
      ...classes,
      ...columns,
      ...baseElement,
      ...genericName,
      ...view,
      ...templates,
      ...slots,
      ...disabled,
      ...events,
      ...data,
      ...empty,
      ...default_,
      ...nullValue,
      ...handleInput,
      ...handleError,
      ...handleAlert,
      ...editor,
      ...languages,
    }
  } 
}