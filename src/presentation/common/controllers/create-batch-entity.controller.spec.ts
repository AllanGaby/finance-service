import { CreateBatchEntityController } from './create-batch-entity.controller'
import { CreateEntityUseCaseSpy, EntityModel, mockEntityModel } from '@/domain/common'
import { mockCreateBatchEntityRequest } from '@/presentation/common'
import { RequestValidatorProtocolSpy, mockRequestValidatorModel, mockFieldValidationModel, FieldValidationModel } from '@/protocols/request-validator'
import { HttpHelper } from '@/protocols/http'

type sutTypes = {
  sut: CreateBatchEntityController<EntityModel>
  fieldsToValidate: FieldValidationModel[]
  validator: RequestValidatorProtocolSpy
  createEntityUseCase: CreateEntityUseCaseSpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const fieldsToValidate = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  const validator = new RequestValidatorProtocolSpy()
  const createEntityUseCase = new CreateEntityUseCaseSpy<EntityModel>()
  const sut = new CreateBatchEntityController<EntityModel>(fieldsToValidate, validator, createEntityUseCase)
  return {
    sut,
    fieldsToValidate,
    validator,
    createEntityUseCase
  }
}

describe('CreateBatchEntityController', () => {
  test('Should call validator with correct value', async () => {
    const { sut, fieldsToValidate, validator } = makeSut()
    const request = mockCreateBatchEntityRequest()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle(request)
    request.body.forEach(item => {
      expect(validateSpy).toHaveBeenCalledWith(fieldsToValidate, Object(item))
    })
  })

  test('Should return unprocessableEntity if validator fails', async () => {
    const { sut, validator } = makeSut()
    const error = mockRequestValidatorModel()
    jest.spyOn(validator, 'validate').mockReturnValueOnce([error])
    const result = await sut.handle(mockCreateBatchEntityRequest())
    expect(result).toEqual(HttpHelper.unprocessableEntity([error]))
  })

  test('Should call CreateEntityUseCase with correct value', async () => {
    const { sut, createEntityUseCase } = makeSut()
    const request = mockCreateBatchEntityRequest()
    const createSpy = jest.spyOn(createEntityUseCase, 'create')
    await sut.handle(request)
    expect(createSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should fails if CreateEntityUseCase fails', async () => {
    const { sut, createEntityUseCase } = makeSut()
    jest.spyOn(createEntityUseCase, 'create').mockRejectedValue(new Error())
    const promise = sut.handle(mockCreateBatchEntityRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return created if CreateEntityUseCase is succeeds and CreateEntityUseCase returns a entity', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = mockEntityModel()
    const result = await sut.handle(mockCreateBatchEntityRequest())
    expect(result).toEqual(HttpHelper.created(createEntityUseCase.entity))
  })

  test('Should return noContent if CreateEntityUseCase is succeeds and CreateEntityUseCase returns undefined', async () => {
    const { sut, createEntityUseCase } = makeSut()
    createEntityUseCase.entity = undefined
    const result = await sut.handle(mockCreateBatchEntityRequest())
    expect(result).toEqual(HttpHelper.noContent())
  })
})
