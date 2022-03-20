import { DeleteEntityController } from './delete-entity.controller'
import { DeleteEntityByIdUseCaseSpy, EntityModel } from '@/domain/common'
import { mockCommonIdParamsRequest } from '@/presentation/common'
import { HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: DeleteEntityController<EntityModel>
  deleteEntityByIdUseCase: DeleteEntityByIdUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const deleteEntityByIdUseCase = new DeleteEntityByIdUseCaseSpy<EntityModel>()
  const sut = new DeleteEntityController<EntityModel>(deleteEntityByIdUseCase, 'id')
  return {
    sut,
    deleteEntityByIdUseCase
  }
}

describe('DeleteEntityController', () => {
  test('Should call DeleteEntityByIdUseCase with correct value', async () => {
    const { sut, deleteEntityByIdUseCase } = makeSut()
    const request = mockCommonIdParamsRequest()
    await sut.handle(request)
    expect(deleteEntityByIdUseCase.entityId).toBe(request.params.id)
  })

  test('Should fails if DeleteEntityByIdUseCase fails', async () => {
    const { sut, deleteEntityByIdUseCase } = makeSut()
    jest.spyOn(deleteEntityByIdUseCase, 'deleteById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.handle(mockCommonIdParamsRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return noContent if DeleteEntityByIdUseCase is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockCommonIdParamsRequest())
    expect(response).toEqual(HttpHelper.noContent())
  })
})
