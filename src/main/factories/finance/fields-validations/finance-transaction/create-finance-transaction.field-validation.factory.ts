import { FinanceTransctionType } from '@/domain/finance'
import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateFinanceTransactionFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'title',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'type',
    type: TypeFieldValidation.String,
    required: true,
    values: Object.values(FinanceTransctionType)
  },
  {
    name: 'date',
    type: TypeFieldValidation.Date,
    required: true
  },
  {
    name: 'value',
    type: TypeFieldValidation.Number,
    required: true
  },
  {
    name: 'finance_account_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'company_id',
    type: TypeFieldValidation.String,
    uuid: true
  },
  {
    name: 'transaction_category_id',
    type: TypeFieldValidation.String,
    uuid: true
  }
])
