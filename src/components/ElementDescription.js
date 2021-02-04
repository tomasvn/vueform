import { computed } from 'composition-api'
import useElementComponent from './../composables/useElementComponent'

export default {
  name: 'ElementDescription',
  init(props, context)
  {
    // ============ DEPENDENCIES ============

    const {
      el$,
      form$,
      classes,
      components,
      mainClass,
      theme
    } = useElementComponent(props, context)

    // ============== COMPUTED ==============

    /**
     * 
     * 
     * @private
     */
    const description = computed(() => {
      return el$.value.description
    })

    return {
      el$,
      form$,
      theme,
      classes,
      mainClass,
      components,
      description,
    }
  },
}