import { RhoneRequestConfig, RhoneResponse } from '../types'

export class RhoneError extends Error {
  isRhoneError: boolean
  config: RhoneRequestConfig
  code?: string | number | null
  request?: any
  response?: RhoneResponse

  /* istanbul ignore next */
  constructor(
    message: string,
    config: RhoneRequestConfig,
    code?: string | number | null,
    request?: any,
    response?: RhoneResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isRhoneError = true

    Object.setPrototypeOf(this, RhoneError.prototype)
  }
}

export function createError(
  message: string,
  config: RhoneRequestConfig,
  code?: string | number | null,
  request?: any,
  response?: RhoneResponse
) {
  const error = new RhoneError(message, config, code, request, response)
  return error
}
