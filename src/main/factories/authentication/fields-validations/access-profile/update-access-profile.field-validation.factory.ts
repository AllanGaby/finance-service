import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateAccessProfileFieldsValidations } from '@/main/factories/authentication/fields-validations'

export const makeUpdateAccessProfileFieldsValidations = (): FieldValidationModel[] =>
  makeCreateAccessProfileFieldsValidations()
