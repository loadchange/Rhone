import { RhoneRequestConfig, RhoneResponse, RhonePromise } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: RhoneRequestConfig): RhonePromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: RhoneRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: RhoneRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(response: RhoneResponse): RhoneResponse {
  response.data = transform(response.data, response.headers, response.config.transformResponse)
  return response
}
