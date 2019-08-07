import { RhoneInstance } from './types'
import Rhone from './core/Rhone'
import { extend } from './helpers/util'

function createInstance(): RhoneInstance {
  const context = new Rhone()
  const instance = Rhone.prototype.request.bind(context)

  extend(instance, context)
  return instance as RhoneInstance
}

const rhone = createInstance()

export default rhone
