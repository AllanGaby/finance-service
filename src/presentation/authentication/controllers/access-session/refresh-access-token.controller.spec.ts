import { RefreshAccessTokenController } from './refresh-access-token.controller'
import { mockSettingsModel } from '@/domain/common'
import { RefreshAccessTokenUseCaseSpy, mockAccessSessionPayloadModel } from '@/domain/authentication'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { mockRequest, SettingsHeaderRequest } from '@/presentation/common'
import { RefreshAccessTokenRequest, mockRefreshAccessTokenRequest } from '@/presentation/authentication'

type sutTypes = {
  sut: RefreshAccessTokenController
  refreshAccessTokenUseCase: RefreshAccessTokenUseCaseSpy
  request: HttpRequest<RefreshAccessTokenRequest, SettingsHeaderRequest>
}

const makeSut = (): sutTypes => {
  const refreshAccessTokenUseCase = new RefreshAccessTokenUseCaseSpy()
  const sut = new RefreshAccessTokenController(refreshAccessTokenUseCase)
  return {
    sut,
    request: mockRequest<RefreshAccessTokenRequest, SettingsHeaderRequest>(mockRefreshAccessTokenRequest(), {
      settings: mockSettingsModel()
    }),
    refreshAccessTokenUseCase
  }
}

describe('RefreshAccessTokenController', () => {
  test('Should call RefreshAccessTokenUseCase with correct value', async () => {
    const { sut, refreshAccessTokenUseCase, request } = makeSut()
    const refreshSpy = jest.spyOn(refreshAccessTokenUseCase, 'refresh')
    await sut.handle(request)
    expect(refreshSpy).toHaveBeenCalledWith({
      ...request.body,
      ip: request.ip
    }, request.headers.settings)
  })

  test('Should fails if RefreshAccessTokenUseCase fails', async () => {
    const { sut, refreshAccessTokenUseCase, request } = makeSut()
    jest.spyOn(refreshAccessTokenUseCase, 'refresh').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok if RefreshAccessTokenUseCase is succeeds', async () => {
    const { sut, refreshAccessTokenUseCase, request } = makeSut()
    const accessSession = mockAccessSessionPayloadModel()
    jest.spyOn(refreshAccessTokenUseCase, 'refresh').mockResolvedValue(accessSession)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.ok(accessSession))
  })
})
