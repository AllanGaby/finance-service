import { CreateEntityController } from './create-entity.controller'
import { CreateEntityDTO, CreateEntityUseCaseSpy, EntityModel, mockEntityModel } from '@/domain/common'
import { mockCreateEntityRequest, SettingsHeaderRequest } from '@/presentation/common'
import { HttpHelper, HttpRequest } from '@/protocols/http'

type sutTypes = {
  sut: CreateEntityController<EntityModel>
  createEntityUseCase: CreateEntityUseCaseSpy<EntityModel>
  request: HttpRequest<CreateEntityDTO<EntityModel>, SettingsHeaderRequest>
}

const makeSut = (): sutTypes => {
  const createEntityUseCase = new CreateEntityUseCaseSpy<EntityModel>()
  const sut = new CreateEntityController<EntityModel>(createEntityUseCase)
  return {
    sut,
    createEntityUseCase,
    request: mockCreateEntityRequest()
  }
}

describe('CreateEntityController', () => {
  test('Should call CreateEntityUseCase with correct value', async () => {
    const { sut, createEntityUseCase, request } = makeSut()
    const createSpy = jest.spyOn(createEntityUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith(request.body, request.headers.settings)
  })

  test('Should fails if CreateEntityUseCase fails', async () => {
    const { sut, createEntityUseCase, request } = makeSut()
    jest.spyOn(createEntityUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return created if CreateEntityUseCase is succeeds and CreateEntityUseCase returns a entity', async () => {
    const { sut, createEntityUseCase, request } = makeSut()
    createEntityUseCase.entity = mockEntityModel()
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.created(createEntityUseCase.entity))
  })

  test('Should return noContent if CreateEntityUseCase is succeeds and CreateEntityUseCase returns undefined', async () => {
    const { sut, createEntityUseCase, request } = makeSut()
    createEntityUseCase.entity = undefined
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.noContent())
  })
})
