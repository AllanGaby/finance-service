import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeUpdateAccountFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  }
])
