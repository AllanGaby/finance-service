import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export const makeUpdateModuleFieldsValidations = (): FieldValidationModel[] =>
  makeCreateModuleFieldsValidations()
