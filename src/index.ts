import { RhoneRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function rhone(config: RhoneRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: RhoneRequestConfig): void {
  config.url = transformURL(config)
}

function transformURL(config: RhoneRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default rhone
