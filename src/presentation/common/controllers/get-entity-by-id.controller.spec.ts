import { GetEntityByIdController } from './get-entity-by-id.controller'
import { GetEntityByIdUseCaseSpy, EntityModel } from '@/domain/common'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { CommonIdParamsRequest } from '@/presentation/common'
import { mockCommonIdParamsRequest } from '@/presentation/common'
import { HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: GetEntityByIdController<EntityModel, CommonIdParamsRequest>
  getEntityByIdUseCase: GetEntityByIdUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const getEntityByIdUseCase = new GetEntityByIdUseCaseSpy()
  const sut = new GetEntityByIdController<EntityModel, CommonIdParamsRequest>(getEntityByIdUseCase, 'id')
  return {
    sut,
    getEntityByIdUseCase
  }
}

describe('GetEntityByIdController', () => {
  test('Should call GetEntityByIdUseCase with correct value', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    const getByIdSPy = jest.spyOn(getEntityByIdUseCase, 'getById')
    const request = mockCommonIdParamsRequest()
    await sut.handle(request)
    expect(getByIdSPy).toHaveBeenCalledWith(request.params.id)
  })

  test('Should fails GetEntityByIdUseCase if fails', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    jest.spyOn(getEntityByIdUseCase, 'getById').mockImplementationOnce(() => { throw new EntityIsNotFoundError('Entity') })
    const promise = sut.handle(mockCommonIdParamsRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return ok if GetEntityByIdUseCase is succeeds', async () => {
    const { sut, getEntityByIdUseCase } = makeSut()
    const response = await sut.handle(mockCommonIdParamsRequest())
    expect(response).toEqual(HttpHelper.ok(getEntityByIdUseCase.entity))
  })
})
