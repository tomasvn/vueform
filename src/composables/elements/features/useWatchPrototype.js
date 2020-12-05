import { watch } from 'composition-api'

const base = function(props, context, dependencies)
{
  // ============ DEPENDENCIES ============

  const instances = dependencies.instances
  const prototype = dependencies.prototype

  // ============== WATCHERS ==============

  watch(prototype, () => {
    instances.value = _.map(instances.value, (instance) => {
      return Object.assign({}, prototype.value, {
        key: instance.key,
      })
    })
  }, { deep: true })

  return {}
}

export default base