import { RhoneInstance, RhoneRequestConfig } from './types'
import Rhone from './core/Rhone'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: RhoneRequestConfig): RhoneInstance {
  const context = new Rhone(config)
  const instance = Rhone.prototype.request.bind(context)

  extend(instance, context)
  return instance as RhoneInstance
}

const rhone = createInstance(defaults)

export default rhone
