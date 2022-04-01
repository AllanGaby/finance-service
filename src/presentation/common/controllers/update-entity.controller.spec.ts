import { UpdateEntityController } from './update-entity.controller'
import { EntityModel, mockEntityModel, UpdateEntityDTO, UpdateEntityUseCaseSpy } from '@/domain/common'
import { mockUpdateEntityRequest, UpdateEntityRequest } from '@/presentation/common'
import { HttpRequest, HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: UpdateEntityController<EntityModel>
  request: HttpRequest<UpdateEntityRequest<UpdateEntityDTO<EntityModel>>>
  updateEntityUseCase: UpdateEntityUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const updateEntityUseCase = new UpdateEntityUseCaseSpy<EntityModel>()
  const request = mockUpdateEntityRequest()
  const sut = new UpdateEntityController<EntityModel>(updateEntityUseCase)
  return {
    sut,
    request,
    updateEntityUseCase
  }
}

describe('UpdateEntityController', () => {
  test('Should call UpdateEntityUseCase with correct value', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    const updateSpy = jest.spyOn(updateEntityUseCase, 'update')
    await sut.handle(request)
    expect(updateSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should fails if UpdateEntityUseCase fails', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    jest.spyOn(updateEntityUseCase, 'update').mockRejectedValue(new Error())
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok if UpdateEntityUseCase is succeeds and UpdateEntityUseCase returns a entity', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    const updatedEntity = mockEntityModel()
    jest.spyOn(updateEntityUseCase, 'update').mockResolvedValue(updatedEntity)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.ok(updatedEntity))
  })

  test('Should return noContent if updateEntityUseCase is succeeds and updateEntityUseCase returns undefined', async () => {
    const { sut, updateEntityUseCase, request } = makeSut()
    jest.spyOn(updateEntityUseCase, 'update').mockResolvedValue(undefined)
    const result = await sut.handle(request)
    expect(result).toEqual(HttpHelper.noContent())
  })
})
