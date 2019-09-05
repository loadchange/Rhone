import { RhoneRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: RhoneRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    (data: any, headers: any): any => {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    (data: any): any => {
      return transformResponse(data)
    }
  ],
  validateStatus: function(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsNoData = ['head', 'get', 'delete', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
