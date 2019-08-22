import { RhoneStatic, RhoneRequestConfig } from './types'
import Rhone from './core/Rhone'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: RhoneRequestConfig): RhoneStatic {
  const context = new Rhone(config)
  const instance = Rhone.prototype.request.bind(context)

  extend(instance, context)
  return instance as RhoneStatic
}

const rhone = createInstance(defaults)

rhone.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default rhone
