import { RhonePromise, RhoneRequestConfig } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Rhone {
  request(config: RhoneRequestConfig): RhonePromise
  request(ur: string, config?: RhoneRequestConfig): RhonePromise

  request(): RhonePromise {
    if (arguments.length === 1) {
      const [arg] = Array.from(arguments)
      return dispatchRequest(typeof arg === 'string' ? { url: arg } : arg)
    }
    if (arguments.length === 2) {
      const [url, config] = Array.from(arguments)
      return dispatchRequest(Object.assign({}, config, { url }))
    }
    throw new Error('arguments error')
  }

  get(url: string, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise {
    return this.requestMethodWithData('patch', url, data, config)
  }

  private requestMethodWithoutData(
    method: string,
    url: string,
    config?: RhoneRequestConfig
  ): RhonePromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private requestMethodWithData(
    method: string,
    url: string,
    data?: any,
    config?: RhoneRequestConfig
  ): RhonePromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
