import { HttpStatusCode } from '@/protocols/http'

export type HttpResponse<BodyType = any, HeadersType = any> = {
  statusCode: HttpStatusCode
  body: BodyType
  headers?: HeadersType
}
