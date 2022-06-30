import { FieldValidationModel } from '@/protocols/request-validator'
import { makeCreateTransactionTagFieldsValidations } from '@/main/factories/finance'

export const makeUpdateTransactionTagFieldsValidations = (): FieldValidationModel[] =>
  makeCreateTransactionTagFieldsValidations()
