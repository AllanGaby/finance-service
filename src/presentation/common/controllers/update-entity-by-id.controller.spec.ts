import { UpdateEntityByIdController, UpdateEntityByIdRequestDefault } from './update-entity-by-id.controller'
import { EntityModel, UpdateEntityDTO, UpdateEntityByIdUseCaseSpy } from '@/domain/common'
import { mockUpdateEntityRequest } from '@/presentation/common'
import { HttpRequest, HttpHelper } from '@/protocols/http'
import { UpdateEntityRequest } from '@/presentation/common'

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

  test('Should return Updated if UpdateEntityByIdUseCase is succeeds', async () => {
    const { sut, updateEntityByIdUseCase, request } = makeSut()
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.ok(updateEntityByIdUseCase.updatedEntity))
  })
})
