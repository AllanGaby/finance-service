import { FieldValidationMiddleware } from './field-validation.middleware'
import { RequestValidatorSpy, mockRequestValidatorModel, mockFieldValidationModel, FieldValidationModel } from '@/protocols/request-validator'
import { mockEntityModel } from '@/domain/common'
import { HttpHelper, FieldValidationType, mockFieldValidationType } from '@/protocols/http'

type sutTypes = {
  sut: FieldValidationMiddleware
  validator: RequestValidatorSpy
  fieldToValidation: FieldValidationModel[]
  fieldValidationType: FieldValidationType
}

const makeSut = (defineFieldValidationType: boolean = true): sutTypes => {
  const validator = new RequestValidatorSpy()
  const fieldValidationType = defineFieldValidationType ? mockFieldValidationType() : undefined
  const fieldToValidation: FieldValidationModel[] = [
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel(),
    mockFieldValidationModel()
  ]
  const sut = new FieldValidationMiddleware(validator, fieldToValidation, fieldValidationType)
  return {
    sut,
    validator,
    fieldToValidation,
    fieldValidationType
  }
}

describe('FieldValidationMiddleware', () => {
  test('Should call Validator with correct value if fieldValidationType is provided', async () => {
    const { sut, validator, fieldToValidation, fieldValidationType } = makeSut()
    const data = mockEntityModel()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle({
      [fieldValidationType]: data
    })
    expect(validateSpy).toHaveBeenCalledWith(fieldToValidation, data)
  })

  test('Should call Validator with correct value if fieldValidationType is provided', async () => {
    const { sut, validator, fieldToValidation } = makeSut(false)
    const data = mockEntityModel()
    const validateSpy = jest.spyOn(validator, 'validate')
    await sut.handle({
      body: data
    })
    expect(validateSpy).toHaveBeenCalledWith(fieldToValidation, data)
  })

  test('Should return unprocessableEntity Status Code (422) if Validator fails', async () => {
    const { sut, validator } = makeSut()
    const validationErrors = [
      mockRequestValidatorModel(),
      mockRequestValidatorModel(),
      mockRequestValidatorModel()
    ]
    jest.spyOn(validator, 'validate').mockReturnValue(validationErrors)
    const response = await sut.handle({
      body: mockEntityModel()
    })
    expect(response).toEqual(HttpHelper.unprocessableEntity(validationErrors))
  })

  test('Should return Ok Status Code (200) if Validator succeeds', async () => {
    const { sut, validator } = makeSut()
    const body = mockEntityModel()
    const headers = mockEntityModel()
    jest.spyOn(validator, 'validate').mockReturnValue(undefined)
    const response = await sut.handle({
      body,
      headers
    })
    expect(response).toEqual(HttpHelper.ok(body, headers))
  })
})
