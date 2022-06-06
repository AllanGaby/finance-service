import { HttpRequest, HttpResponse } from '@/protocols/http'

export interface MiddlewareProtocol<RequestBody, ResponseBody, HeadersType = any, RequestQueryParamsType = object, RequestParamsType = any, UserType = any> {
  handle: (request: HttpRequest<RequestBody, HeadersType, RequestQueryParamsType, RequestParamsType, UserType>) => Promise<HttpResponse<ResponseBody>>
}
