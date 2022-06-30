import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateFinanceTransactionFieldsValidations } from '@/main/factories/finance'

export const makeUpdateFinanceTransactionFieldsValidations = (): FieldValidationModel[] =>
  makeCreateFinanceTransactionFieldsValidations()
