import { RejectedFn, ResolvedFn, RhonePromise, RhoneRequestConfig, RhoneResponse } from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<RhoneRequestConfig>
  response: InterceptorManager<RhoneResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: RhoneRequestConfig) => RhonePromise)
  rejected?: RejectedFn
}

export default class Rhone {
  defaults: RhoneRequestConfig
  interceptors: Interceptors

  constructor(initConfig: RhoneRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<RhoneRequestConfig>(),
      response: new InterceptorManager<RhoneResponse>()
    }
  }

  request(config: RhoneRequestConfig): RhonePromise
  request(ur: string, config?: RhoneRequestConfig): RhonePromise

  request(): RhonePromise {
    let rhoneConfig = Object.create(null)
    if (arguments.length === 1) {
      const [arg] = Array.from(arguments)
      rhoneConfig = typeof arg === 'string' ? { url: arg } : arg
    }
    if (arguments.length === 2) {
      const [url, config] = Array.from(arguments)
      rhoneConfig = Object.assign({}, config, { url })
    }
    rhoneConfig = mergeConfig(this.defaults, rhoneConfig)
    rhoneConfig.method = rhoneConfig.method.toLowerCase()
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(rhoneConfig)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise as RhonePromise
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

  getUri(config?: RhoneRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
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
