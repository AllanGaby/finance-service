import axios from 'axios'
import { HttpResponse, mockHttpResponse } from '@/protocols/http'

export const mockAxios = (httpResponse: HttpResponse = mockHttpResponse()): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue({
    data: httpResponse.body,
    status: httpResponse.statusCode
  })
  return mockedAxios
}
