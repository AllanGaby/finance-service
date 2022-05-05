import { LoginController } from './login.controller'
import { LoginUseCaseSpy, LoginDTO, mockAccessSessionPayloadModel, mockLoginDTO } from '@/domain/authentication'
import { CreateEntityRequest, mockRequest, SettingsHeaderRequest } from '@/presentation/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { mockSettingsModel } from '@/domain/common'

type sutTypes = {
  sut: LoginController
  loginUseCase: LoginUseCaseSpy
  request: HttpRequest<CreateEntityRequest<LoginDTO>, SettingsHeaderRequest>
}

const makeSut = (): sutTypes => {
  const loginUseCase = new LoginUseCaseSpy()
  const sut = new LoginController(loginUseCase)
  return {
    sut,
    request: mockRequest<CreateEntityRequest<LoginDTO>, SettingsHeaderRequest>(mockLoginDTO(), {
      settings: mockSettingsModel()
    }),
    loginUseCase
  }
}

describe('LoginController', () => {
  test('Should call loginUseCase with correct value', async () => {
    const { sut, loginUseCase, request } = makeSut()
    const loginSpy = jest.spyOn(loginUseCase, 'login')
    await sut.handle(request)
    expect(loginSpy).toHaveBeenCalledWith({
      ...request.body,
      ip: request.ip
    }, request.headers.settings)
  })

  test('Should fails if loginUseCase fails', async () => {
    const { sut, loginUseCase, request } = makeSut()
    jest.spyOn(loginUseCase, 'login').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return logind if loginUseCase is succeeds', async () => {
    const { sut, loginUseCase, request } = makeSut()
    const accessSession = mockAccessSessionPayloadModel()
    jest.spyOn(loginUseCase, 'login').mockResolvedValue(accessSession)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.created(accessSession))
  })
})
