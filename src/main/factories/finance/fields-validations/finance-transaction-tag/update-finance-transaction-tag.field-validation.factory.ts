import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateFinanceTransactionTagFieldsValidations } from '@/main/factories/finance'

export const makeUpdateFinanceTransactionTagFieldsValidations = (): FieldValidationModel[] =>
  makeCreateFinanceTransactionTagFieldsValidations()
