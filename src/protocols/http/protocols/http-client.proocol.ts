import { HttpRequest, HttpResponse } from '@/protocols/http'

export interface HttpClient {
  request: <ResponseBodyType = any>(data: HttpRequest) => Promise<HttpResponse<ResponseBodyType>>
}
