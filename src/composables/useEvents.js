import { ref } from 'composition-api'

export default function useEvents(props, context, dependencies, options = {})
{
  if (!options.events) {
    throw new Error('`events` option is required for useEvents')
  }

  // ============ DEPENDENCIES =============

  const form$ = dependencies.form$
  const descriptor = dependencies.descriptor || null

  // ================ DATA ================

  /**
   * Helper property used to store available events for the element.
   * 
   * @type {array}
   * @default []
   */
  const events = ref(options.events)

  /**
   * Helper property used to store listeners for events.
   * 
   * @ignore
   * @type {object}
   * @default {}
   */
  const listeners = ref({})


  // =============== METHODS ==============

  /**
   * Adds a listener for an event.
   *
   * @public
   * @param {string} event event to listen for.
   * @param {function} callback callback to run when the event is triggered. The `this` variable refers to the component the listener is set for.
   * @returns {void}
   */
  const on = (evt, callback) => {
    if (!listeners.value[evt]) {
      listeners.value[evt] = []
    }

    listeners.value[evt].push(callback)
  }

  /**
   * Removes all listeners for an event.
   *
   * @public
   * @param {string} event event to remove the listeners for.
   * @returns {void}
   */
  const off = (evt) => {
    delete listeners.value[evt]
  }

  /**
   * Fires an event.
   *
   * @public
   * @returns {any}
   */
  const fire = function() {
    let evt = arguments[0]
    let args = [].slice.call(arguments).splice(1)

    _.each(listeners.value[evt], (callback) => {
      callback.apply(form$.value, args)
    })
  }

  // =============== HOOKS ================

  // If component has descriptor subscribe upfront
  // for events using `onEvent` format 
  if (descriptor) {
    _.each(events.value, (evt) => {
      let callback = descriptor.value['on' + _.upperFirst(evt)]

      if (callback !== undefined) {
        on(evt, callback)
      }
    })
  }

  return {
    // Data
    events,
    listeners,

    // Methods
    on,
    off,
    fire,
  }
}