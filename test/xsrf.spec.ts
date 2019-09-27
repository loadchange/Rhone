import rhone from '../src/index'
import { getAjaxRequest } from './helper'

describe('xsrf', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
    document.cookie =
      rhone.defaults.xsrfCookieName + '=;expires=' + new Date(Date.now() - 86400000).toUTCString()
  })

  test('should not set xsrf header if cookie is null', () => {
    rhone('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[rhone.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header if cookie is set', () => {
    document.cookie = rhone.defaults.xsrfCookieName + '=12345'

    rhone('/foo')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[rhone.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })

  test('should not set xsrf header for cross origin', () => {
    document.cookie = rhone.defaults.xsrfCookieName + '=12345'

    rhone('http://example.com/')

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[rhone.defaults.xsrfHeaderName!]).toBeUndefined()
    })
  })

  test('should set xsrf header for cross origin when using withCredentials', () => {
    document.cookie = rhone.defaults.xsrfCookieName + '=12345'

    rhone('http://example.com/', {
      withCredentials: true
    })

    return getAjaxRequest().then(request => {
      expect(request.requestHeaders[rhone.defaults.xsrfHeaderName!]).toBe('12345')
    })
  })
})
