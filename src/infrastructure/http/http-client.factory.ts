import { HttpClient } from '@/protocols/http'
import { AxiosHttpClient } from '@/infrastructure/http/clients'

export class HttpClientFactory {
  static getHttpClient (): HttpClient {
    return new AxiosHttpClient()
  }
}
