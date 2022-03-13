import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, AxiosErrorSpy } from '@/infrastructure/http/mocks'
import { mockHttpRequest, mockHttpResponse } from '@/protocols/http'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error', async () => {
    const { sut, mockedAxios } = makeSut()
    const rejectedResponse = mockHttpResponse()
    jest.spyOn(axios, 'request').mockImplementation(() => {
      throw new AxiosErrorSpy(rejectedResponse)
    })
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: rejectedResponse.statusCode,
        data: rejectedResponse.body
      }
    })

    const response = await sut.request(mockHttpRequest())

    expect(response).toEqual(rejectedResponse)
  })
})
