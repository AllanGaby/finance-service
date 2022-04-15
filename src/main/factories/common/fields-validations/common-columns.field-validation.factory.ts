import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCommonColumnsFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'columns',
    type: TypeFieldValidation.String,
    required: true
  }
])
