import { RhoneRequestConfig } from './types'

export default function xhr(config: RhoneRequestConfig) {
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
