import { HttpRequest, HttpResponse } from '@/protocols/http'

export interface ControllerProtocol<RequestBody, ResponseBody, RequestHeaders = any, RequestQueryParams = any, RequestParams = any> {
  handle: (request: HttpRequest<RequestBody, RequestHeaders, RequestQueryParams, RequestParams>) => Promise<HttpResponse<ResponseBody>>
}
