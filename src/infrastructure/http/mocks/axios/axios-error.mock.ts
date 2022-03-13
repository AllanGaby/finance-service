import { HttpResponse } from '@/protocols/http'
import { AxiosError, AxiosResponse } from 'axios'

export class AxiosErrorSpy extends Error implements AxiosError {
  response: AxiosResponse
  config: any
  isAxiosError: boolean

  constructor (response: HttpResponse) {
    super('')
    this.name = 'InvalidCredentialsError'
    this.response = {
      data: response.body,
      status: response.statusCode,
      statusText: response.statusCode.toString(),
      config: undefined,
      headers: undefined
    }
  }

  toJSON (): Object {
    return undefined
  }
}
