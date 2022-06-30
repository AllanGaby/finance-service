import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateFinanceTransactionTagFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'finance_transaction_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'transaction_tag_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
