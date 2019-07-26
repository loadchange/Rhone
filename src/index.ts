import { RhoneRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function rhone(config: RhoneRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: RhoneRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformData(config)
}

function transformURL(config: RhoneRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformData(config: RhoneRequestConfig): any {
  return transformRequest(config.data)
}

export default rhone
