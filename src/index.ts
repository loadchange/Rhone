import { RhoneRequestConfig, RhoneResponse, RhonePromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

function rhone(config: RhoneRequestConfig): RhonePromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: RhoneRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData(config)
}

function transformURL(config: RhoneRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformData(config: RhoneRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: RhoneRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(response: RhoneResponse): RhoneResponse {
  response.data = transformResponse(response.data)
  return response
}

export default rhone
