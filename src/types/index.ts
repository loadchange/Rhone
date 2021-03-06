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
  transformRequest?: RhoneTransformer | RhoneTransformer[]
  transformResponse?: RhoneTransformer | RhoneTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: RhoneBasicCredentials
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string
  baseURL?: string

  [propName: string]: any
}

export interface RhoneResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: RhoneRequestConfig
  request: any
}

export interface RhonePromise<T = any> extends Promise<RhoneResponse<T>> {}

export interface RhoneError extends Error {
  isRhoneError: boolean
  config: RhoneRequestConfig
  code?: string | number
  request?: any
  response?: RhoneResponse
}

export interface Rhone {
  defaults: RhoneRequestConfig
  interceptors: {
    request: RhoneInterceptorManager<RhoneRequestConfig>
    response: RhoneInterceptorManager<RhoneResponse>
  }

  request<T = any>(config: RhoneRequestConfig): RhonePromise<T>

  get<T = any>(url: string, config?: RhoneRequestConfig): RhonePromise<T>

  delete<T = any>(url: string, config?: RhoneRequestConfig): RhonePromise<T>

  head<T = any>(url: string, config?: RhoneRequestConfig): RhonePromise<T>

  options<T = any>(url: string, config?: RhoneRequestConfig): RhonePromise<T>

  post<T = any>(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise<T>

  put<T = any>(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise<T>

  patch<T = any>(url: string, data?: any, config?: RhoneRequestConfig): RhonePromise<T>

  getUri(config?: RhoneRequestConfig): string
}

export interface RhoneInstance extends Rhone {
  <T = any>(config: RhoneRequestConfig): RhonePromise<T>

  <T = any>(url: string, config?: RhoneRequestConfig): RhonePromise<T>
}

export interface RhoneClassStatic {
  new (config: RhoneRequestConfig): Rhone
}

export interface RhoneStatic extends RhoneInstance {
  create(config?: RhoneRequestConfig): RhoneInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R

  Rhone: RhoneClassStatic
}

export interface RhoneInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface RhoneTransformer {
  (data: any, headers?: any): any
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface RhoneBasicCredentials {
  username: string
  password: string
}
