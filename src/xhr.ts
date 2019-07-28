import { RhoneRequestConfig } from './types'

export default function xhr(config: RhoneRequestConfig) {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
      return
    }
    request.setRequestHeader(name, headers[name])
  })
  request.send(data)
}
