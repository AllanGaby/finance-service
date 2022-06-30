import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateCompanyTypeFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  }
])
