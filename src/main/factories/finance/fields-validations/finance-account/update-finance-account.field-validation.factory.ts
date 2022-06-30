import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateFinanceAccountFieldsValidations } from '@/main/factories/finance'

export const makeUpdateFinanceAccountFieldsValidations = (): FieldValidationModel[] =>
  makeCreateFinanceAccountFieldsValidations()
