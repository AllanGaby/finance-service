import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateCompanyFieldsValidations } from '@/main/factories/finance'

export const makeUpdateCompanyFieldsValidations = (): FieldValidationModel[] =>
  makeCreateCompanyFieldsValidations()
