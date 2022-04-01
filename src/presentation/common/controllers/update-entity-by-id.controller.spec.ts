import { UpdateEntityByIdController, UpdateEntityByIdRequestDefault } from './update-entity-by-id.controller'
import { EntityModel, UpdateEntityDTO, UpdateEntityByIdUseCaseSpy, mockEntityModel } from '@/domain/common'
import { mockUpdateEntityRequest, UpdateEntityRequest } from '@/presentation/common'
import { HttpRequest, HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: UpdateEntityByIdController<EntityModel>
  request: HttpRequest<UpdateEntityRequest<UpdateEntityDTO<EntityModel>>, any, any, UpdateEntityByIdRequestDefault>
  updateEntityByIdUseCase: UpdateEntityByIdUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const updateEntityByIdUseCase = new UpdateEntityByIdUseCaseSpy<EntityModel>()
  const request = mockUpdateEntityRequest()
  const sut = new UpdateEntityByIdController<EntityModel>(updateEntityByIdUseCase, 'id')
  return {
    sut,
    request,
    updateEntityByIdUseCase
  }
}

describe('UpdateEntityByIdController', () => {
  test('Should call UpdateEntityByIdUseCase with correct value', async () => {
    const { sut, updateEntityByIdUseCase, request } = makeSut()
    const updateSpy = jest.spyOn(updateEntityByIdUseCase, 'updateById')
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.params.id, request.body)
  })

  test('Should fails if UpdateEntityByIdUseCase fails', async () => {
    const { sut, updateEntityByIdUseCase, request } = makeSut()
    jest.spyOn(updateEntityByIdUseCase, 'updateById').mockRejectedValue(new Error())
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok if UpdateEntityByIdUseCase is succeeds and UpdateEntityByIdUseCase returns a entity', async () => {
    const { sut, updateEntityByIdUseCase, request } = makeSut()
    const updatedEntity = mockEntityModel()
    jest.spyOn(updateEntityByIdUseCase, 'updateById').mockResolvedValue(updatedEntity)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.ok(updatedEntity))
  })

  test('Should return noContent if updateEntityByIdUseCase is succeeds and updateEntityByIdUseCase returns undefined', async () => {
    const { sut, updateEntityByIdUseCase, request } = makeSut()
    jest.spyOn(updateEntityByIdUseCase, 'updateById').mockResolvedValue(undefined)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.noContent())
  })
})
