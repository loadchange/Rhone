import { RhoneRequestConfig } from './types'
import xhr from './xhr'

function Rhone(config: RhoneRequestConfig): void {
  xhr(config)
}

export default Rhone
