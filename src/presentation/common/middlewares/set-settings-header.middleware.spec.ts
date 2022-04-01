import { SetSettingsHeaderMiddleware } from './set-settings-header.middleware'
import { GetCurrentSettingsUseCaseSpy, mockEntityModel, mockSettingsModel } from '@/domain/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { mockRequest } from '@/presentation/common'

type sutTypes = {
  sut: SetSettingsHeaderMiddleware
  getCurrentSettingsUseCase: GetCurrentSettingsUseCaseSpy
  request: HttpRequest<any>
}

const makeSut = (): sutTypes => {
  const getCurrentSettingsUseCase = new GetCurrentSettingsUseCaseSpy()
  const sut = new SetSettingsHeaderMiddleware(getCurrentSettingsUseCase)
  return {
    sut,
    getCurrentSettingsUseCase,
    request: mockRequest(mockEntityModel())
  }
}

describe('SetSettingsHeaderMiddleware', () => {
  test('Should call getCurrentSettingsUseCase', async () => {
    const { sut, request, getCurrentSettingsUseCase } = makeSut()
    const getCurrentSettingsSpy = jest.spyOn(getCurrentSettingsUseCase, 'getCurrentSettings')
    await sut.handle(request)
    expect(getCurrentSettingsSpy).toHaveBeenCalled()
  })

  test('Should return ok with correct value getCurrentSettingsUseCase return undefined', async () => {
    const { sut, request, getCurrentSettingsUseCase } = makeSut()
    jest.spyOn(getCurrentSettingsUseCase, 'getCurrentSettings').mockResolvedValue(undefined)
    const { headers } = request
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.ok(request.body, {
      ...headers,
      settings: undefined
    }, request.queryParams, request.params))
  })

  test('Should return ok with correct value getCurrentSettingsUseCase return any settings', async () => {
    const { sut, request, getCurrentSettingsUseCase } = makeSut()
    const settings = mockSettingsModel()
    jest.spyOn(getCurrentSettingsUseCase, 'getCurrentSettings').mockResolvedValue(settings)
    const { headers } = request
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.ok(request.body, {
      ...headers,
      settings
    }, request.queryParams, request.params))
  })
})
