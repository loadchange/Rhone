import { RhoneRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function rhone(config: RhoneRequestConfig): void {
  processConfig(config)
  xhr(config)
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

export default rhone
