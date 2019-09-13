import cookie from '../../src/helpers/cookie'
import { RhoneRequestConfig, RhoneResponse } from '../../src/types'
import { createError } from '../../src/helpers/error'

describe('helpers:error', () => {
  test('should create an Error with message, config, code, request, response and isRhoneError', () => {
    const request = new XMLHttpRequest()
    const config: RhoneRequestConfig = { method: 'get' }
    const response: RhoneResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('Boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('SOMETHING')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isRhoneError).toBeTruthy()
  })
})
