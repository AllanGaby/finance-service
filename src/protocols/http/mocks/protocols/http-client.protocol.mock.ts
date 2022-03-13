import { HttpClient, HttpRequest, HttpResponse, mockHttpResponse } from '@/protocols/http'

export class HttpClientSpy implements HttpClient {
  httpRequest: HttpRequest<any>
  httpResponse: HttpResponse<any> = mockHttpResponse()

  async request (data: HttpRequest<any>): Promise<HttpResponse<any>> {
    this.httpRequest = data
    return this.httpResponse
  }
}
