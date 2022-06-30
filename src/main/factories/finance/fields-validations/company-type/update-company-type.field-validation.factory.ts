import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateCompanyTypeFieldsValidations } from '@/main/factories/finance'

export const makeUpdateCompanyTypeFieldsValidations = (): FieldValidationModel[] =>
  makeCreateCompanyTypeFieldsValidations()
