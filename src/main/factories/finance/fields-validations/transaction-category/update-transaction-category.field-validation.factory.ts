import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateTransactionCategoryFieldsValidations } from '@/main/factories/finance'

export const makeUpdateTransactionCategoryFieldsValidations = (): FieldValidationModel[] =>
  makeCreateTransactionCategoryFieldsValidations()
