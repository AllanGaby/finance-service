import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateTransactionTagFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'account_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
