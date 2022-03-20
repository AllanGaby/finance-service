import { CreateEntityController } from './create-entity.controller'
import { CreateEntityUseCaseSpy, EntityModel, mockEntityModel } from '@/domain/common'
import { mockCreateEntityRequest } from '@/presentation/common'
import { HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: CreateEntityController<EntityModel>
  createEntityUseCase: CreateEntityUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const createEntityUseCase = new CreateEntityUseCaseSpy<EntityModel>()
  const sut = new CreateEntityController<EntityModel>(createEntityUseCase)
  return {
    sut,
    createEntityUseCase
  }
}

describe('CreateEntityController', () => {
  test('Should call CreateEntityUseCase with correct value', async () => {
    const { sut, createEntityUseCase } = makeSut()
    const request = mockCreateEntityRequest()
    const createSpy = jest.spyOn(createEntityUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should fails if CreateEntityUseCase fails', async () => {
    const { sut, createEntityUseCase } = makeSut()
    jest.spyOn(createEntityUseCase, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(mockCreateEntityRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return created if CreateEntityUseCase is succeeds and CreateEntityUseCase returns a entity', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = mockEntityModel()
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(HttpHelper.created(createEntityUseCase.entity))
  })

  test('Should return noContent if CreateEntityUseCase is succeeds and CreateEntityUseCase returns undefined', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = undefined
    const result = await sut.handle(mockCreateEntityRequest())
    expect(result).toEqual(HttpHelper.noContent())
  })
})
