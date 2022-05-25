import { HttpFileResponse } from '@/protocols/http'

export interface HttpResponse<BodyType = any, HeadersType = any, RequestQueryParams = object, RequestParams = any, UserType = any> {
  statusCode: number
  body: BodyType
  params?: RequestParams
  headers?: HeadersType
  queryParams?: RequestQueryParams
  file?: HttpFileResponse
  user?: UserType
}
