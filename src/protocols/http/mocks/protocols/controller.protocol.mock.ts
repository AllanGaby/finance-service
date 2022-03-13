import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { random } from 'faker'

export class ControllerSpy implements ControllerProtocol<Object, Object, Object, Object> {
  request: HttpRequest<Object, Object, Object, Object> = undefined
  response: HttpResponse<Object> = HttpHelper.ok<Object>(random.objectElement())

  async handle (request: HttpRequest<Object, Object, Object, Object>): Promise<HttpResponse<Object>> {
    this.request = request
    return this.response
  }
}
