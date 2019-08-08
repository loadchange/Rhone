export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface RhoneRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface RhoneResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: RhoneRequestConfig
  request: any
}

export interface RhonePromise extends Promise<RhoneResponse> {}

export interface RhoneError extends Error {
  isRhoneError: boolean
  config: RhoneRequestConfig
  code?: string | number
  request?: any
  response?: RhoneResponse
}

export interface Rhone {
  request(config: RhoneRequestConfig): RhonePromise

  get(url: string, config?: RhoneRequestConfig): RhonePromise

  delete(url: string, config?: RhoneRequestConfig): RhonePromise

  head(url: string, config?: RhoneRequestConfig): RhonePromise

  options(url: string, config?: RhoneRequestConfig): RhonePromise

  post(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise

  put(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise

  patch(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise
}

export interface RhoneInstance extends Rhone {
  (config: RhoneRequestConfig): RhonePromise

  (url: string, config?: RhoneRequestConfig): RhonePromise
}
