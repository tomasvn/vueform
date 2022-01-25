import { computed, toRefs } from 'composition-api'
import useElementComponent from './../composables/useElementComponent'

export default {
  name: 'ElementText',
  slots: ['default'],
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup(props, context)
  {
    const { type } = toRefs(props)

    // ============ DEPENDENCIES ============

    const {
      el$,
      form$,
      Size,
      View,
      classesInstance,
      classes,
      Templates,
      template,
      theme,
    } = useElementComponent(props, context)

    // ============== COMPUTED ==============

    /**
     * The value of the content type.
     * 
     * @type {string}
     * @private
     */
    const content = computed(() => {
      return el$.value[type.value]
    })

    /**
     * Whether the contents are provided as a slot.
     * 
     * @type {boolean}
     * @private
     */
    const isSlot = computed(() => {
      return !!(el$.value.slots?.[type.value] || el$.value.$slots?.[type.value] || (context.expose === undefined && el$.value.$scopedSlots?.[type.value]))
    })

    return {
      el$,
      form$,
      Size,
      View,
      classesInstance,
      theme,
      classes,
      Templates,
      template,
      content,
      isSlot,
    }
  },
}