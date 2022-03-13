import { MiddlewareProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { random } from 'faker'

export class MiddlewareSpy implements MiddlewareProtocol<Object, Object> {
  request: HttpRequest<Object> = undefined
  response: HttpResponse<Object> = HttpHelper.ok<Object>(random.objectElement())

  async handle (request: HttpRequest<Object>): Promise<HttpResponse<Object>> {
    this.request = request
    return this.response
  }
}
