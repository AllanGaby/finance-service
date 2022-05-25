import { CreateAccessSessionByProviderController } from './create-access-session-by-provider.controller'
import { CreateEntityUseCaseSpy, mockSettingsModel } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionByProviderDTO, mockAccessSessionPayloadModel } from '@/domain/authentication'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { mockRequest, SettingsHeaderRequest } from '@/presentation/common'
import { AccountProviderRequest, mockAccountProviderRequest } from '@/presentation/authentication'

type sutTypes = {
  sut: CreateAccessSessionByProviderController
  createAccessSessionByProviderUseCase: CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionByProviderDTO>
  request: HttpRequest<any, SettingsHeaderRequest, any, any, AccountProviderRequest>
}

const makeSut = (): sutTypes => {
  const createAccessSessionByProviderUseCase = new CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionByProviderDTO>()
  const request = mockRequest<any, SettingsHeaderRequest, AccountProviderRequest>(undefined, {
    settings: mockSettingsModel()
  }, mockAccountProviderRequest())
  const sut = new CreateAccessSessionByProviderController(
    createAccessSessionByProviderUseCase
  )
  return {
    sut,
    request,
    createAccessSessionByProviderUseCase
  }
}

describe('CreateAccessSessionByProviderController', () => {
  test('Should call createAccessSessionByProviderUseCase with correct values', async () => {
    const { sut, request, createAccessSessionByProviderUseCase } = makeSut()
    const createSpy = jest.spyOn(createAccessSessionByProviderUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith({
      name: request.user.displayName,
      ip: request.ip,
      account_provider_id: request.user.id,
      provider: request.user.provider,
      email: request.user.emails.filter(item => item.verified)[0].value
    }, request.headers.settings)
  })

  test('Should fails if createAccessSessionByProviderUseCase fails', async () => {
    const { sut, request, createAccessSessionByProviderUseCase } = makeSut()
    const error = new Error()
    jest.spyOn(createAccessSessionByProviderUseCase, 'create').mockRejectedValue(error)
    const promise = sut.handle(request)
    expect(promise).rejects.toThrowError(error)
  })

  test('Should return a accessSession if createAccessSessionByProviderUseCase success', async () => {
    const { sut, request, createAccessSessionByProviderUseCase } = makeSut()
    const accessSession = mockAccessSessionPayloadModel()
    jest.spyOn(createAccessSessionByProviderUseCase, 'create').mockResolvedValue(accessSession)
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.created(accessSession))
  })
})
