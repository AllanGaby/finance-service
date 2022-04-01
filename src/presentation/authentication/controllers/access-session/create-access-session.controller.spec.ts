import { CreateAccessSessionController } from './create-access-session.controller'
import { CreateEntityUseCaseSpy } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionDTO, mockAccessSessionPayloadModel, mockCreateAccessSessionDTO } from '@/domain/authentication'
import { CreateEntityRequest, mockRequest } from '@/presentation/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'

type sutTypes = {
  sut: CreateAccessSessionController
  createAccessSessionUseCase: CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>
  request: HttpRequest<CreateEntityRequest<CreateAccessSessionDTO>>
}

const makeSut = (): sutTypes => {
  const createAccessSessionUseCase = new CreateEntityUseCaseSpy<AccessSessionPayloadModel, CreateAccessSessionDTO>()
  const sut = new CreateAccessSessionController(createAccessSessionUseCase)
  return {
    sut,
    request: mockRequest<CreateEntityRequest<CreateAccessSessionDTO>>(mockCreateAccessSessionDTO()),
    createAccessSessionUseCase
  }
}

describe('CreateAccessSessionController', () => {
  test('Should call createAccessSessionUseCase with correct value', async () => {
    const { sut, createAccessSessionUseCase, request } = makeSut()
    const createSpy = jest.spyOn(createAccessSessionUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith({
      ...request.body,
      ip: request.ip
    })
  })

  test('Should fails if createAccessSessionUseCase fails', async () => {
    const { sut, createAccessSessionUseCase, request } = makeSut()
    jest.spyOn(createAccessSessionUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return created if createAccessSessionUseCase is succeeds', async () => {
    const { sut, createAccessSessionUseCase, request } = makeSut()
    const accessSession = mockAccessSessionPayloadModel()
    jest.spyOn(createAccessSessionUseCase, 'create').mockResolvedValue(accessSession)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.created(accessSession))
  })
})
