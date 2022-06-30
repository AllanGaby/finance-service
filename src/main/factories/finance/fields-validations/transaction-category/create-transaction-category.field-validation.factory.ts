import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateTransactionCategoryFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'credit',
    type: TypeFieldValidation.Boolean,
    required: true
  },
  {
    name: 'debit',
    type: TypeFieldValidation.Boolean,
    required: true
  },
  {
    name: 'account_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
