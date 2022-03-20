import { FieldValidationMiddleware } from '@/presentation/common'
import { RequestValidatorFactory } from '@/infrastructure/request-validator'
import { makeCommonIdFieldsValidations } from '@/main/factories/common/fields-validations'
import { FieldValidationType } from '@/protocols/http'

export const makeCommonIdFieldValidationMiddleware = (paramIdName: string): FieldValidationMiddleware =>
  new FieldValidationMiddleware(
    RequestValidatorFactory.getRequestValidator(),
    makeCommonIdFieldsValidations(paramIdName),
    FieldValidationType.Params
  )
