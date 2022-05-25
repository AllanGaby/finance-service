import { HttpMethod } from '@/protocols/http'

export type HttpRequest<BodyType = any, HeadersType = any, RequestQueryParams = object, RequestParams = any, UserType = any> = {
  ip?: string
  url?: string
  method?: HttpMethod
  body?: BodyType
  params?: RequestParams
  headers?: HeadersType
  queryParams?: RequestQueryParams
  user?: UserType
}
