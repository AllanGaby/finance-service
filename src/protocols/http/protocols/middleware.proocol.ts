import { HttpRequest, HttpResponse } from '@/protocols/http'

export interface MiddlewareProtocol<RequestBody, ResponseBody> {
  handle: (request: HttpRequest<RequestBody>) => Promise<HttpResponse<ResponseBody>>
}
