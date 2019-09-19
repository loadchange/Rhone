import rhone, { RhoneRequestConfig, RhoneResponse } from '../src'
import { getAjaxRequest } from './helper'

describe('instance', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should make a http request without verb helper', () => {
    const instance = rhone.create()
    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
    })
  })

  test('should make a http request', () => {
    const instance = rhone.create()
    instance('/foo')
    return getAjaxRequest().then(request => {
      expect(request.url).toBe('/foo')
      expect(request.method).toBe('GET')
    })
  })

  test('should make a post request', () => {
    const instance = rhone.create()
    instance.post('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('POST')
    })
  })

  test('should make a put request', () => {
    const instance = rhone.create()
    instance.put('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PUT')
    })
  })

  test('should make a patch request', () => {
    const instance = rhone.create()
    instance.patch('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('PATCH')
    })
  })

  test('should make a options request', () => {
    const instance = rhone.create()
    instance.options('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('OPTIONS')
    })
  })

  test('should make a delete request', () => {
    const instance = rhone.create()
    instance.delete('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('DELETE')
    })
  })

  test('should make a head request', () => {
    const instance = rhone.create()
    instance.head('/foo')
    return getAjaxRequest().then(request => {
      expect(request.method).toBe('HEAD')
    })
  })

  test('should use instance option', () => {
    const instance = rhone.create({ timeout: 1000 })
    instance.head('/foo')
    return getAjaxRequest().then(request => {
      expect(request.timeout).toBe(1000)
    })
  })

  test('should have defaults.headers', () => {
    const instance = rhone.create({ baseURL: 'https://api.github.vip' })
    expect(typeof instance.defaults.headers).toBe('object')
    expect(typeof instance.defaults.headers.common).toBe('object')
  })

  test('should have interceptors on the instance', done => {
    rhone.interceptors.request.use(config => {
      config.timeout = 2000
      return config
    })
    const instance = rhone.create()

    instance.interceptors.request.use(config => {
      config.withCredentials = true
      return config
    })

    let response: RhoneResponse
    instance.get('/foo').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200
      })
      expect(response.request.timeout).toBe(0)
      expect(response.request.withCredentials).toBeTruthy()
      done()
    })
  })

  test('should get the computed uri', () => {
    const fakeConfig: RhoneRequestConfig = {
      baseURL: 'https://api.github.com',
      url: '/user/100',
      params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
      }
    }
    expect(rhone.getUri(fakeConfig)).toBe(
      'https://api.github.com/user/100?idClient=1&idTest=2&testString=thisIsATest'
    )
  })
})
