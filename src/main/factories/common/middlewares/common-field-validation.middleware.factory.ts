import { FieldValidationMiddleware } from '@/presentation/common'
import { RequestValidatorFactory } from '@/infrastructure/request-validator'
import { FieldValidationModel } from '@/protocols/request-validator'
import { FieldValidationType } from '@/protocols/http'

export const makeCommonFieldValidationMiddleware = (
  fieldsValidation: FieldValidationModel[],
  fieldValidationType: FieldValidationType = FieldValidationType.Body): FieldValidationMiddleware =>
  new FieldValidationMiddleware(
    RequestValidatorFactory.getRequestValidator(),
    fieldsValidation,
    fieldValidationType
  )
