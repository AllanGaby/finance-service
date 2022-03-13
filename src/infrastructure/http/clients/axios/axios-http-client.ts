import { HttpClient, HttpRequest, HttpResponse } from '@/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async axiosRequest <ResponseBodyType = any>(data: HttpRequest): Promise<HttpResponse<ResponseBodyType>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async request <ResponseBodyType = any>(data: HttpRequest): Promise<HttpResponse<ResponseBodyType>> {
    return this.axiosRequest<ResponseBodyType>(data)
  }
}
