import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateAccessSessionFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'login',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'password',
    type: TypeFieldValidation.String,
    min: 6,
    max: 20,
    required: true
  }
])
