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
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
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
