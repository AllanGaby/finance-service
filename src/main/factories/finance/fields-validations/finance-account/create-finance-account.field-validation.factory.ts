import { FinanceAccountType } from '@/domain/finance'
import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateFinanceAccountFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'type',
    type: TypeFieldValidation.String,
    required: true,
    values: Object.values(FinanceAccountType)
  },
  {
    name: 'account_id',
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
    name: 'closing_date',
    type: TypeFieldValidation.Date
  },
  {
    name: 'due_date',
    type: TypeFieldValidation.Date
  },
  {
    name: 'credit_date',
    type: TypeFieldValidation.Date
  },
  {
    name: 'default_credit_value',
    type: TypeFieldValidation.Number
  },
  {
    name: 'default_credit_released',
    type: TypeFieldValidation.Number
  },
  {
    name: 'default_finance_account_for_payment_id',
    type: TypeFieldValidation.String,
    uuid: true
  }
])
