import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeRecoverPasswordFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'verification_code',
    type: TypeFieldValidation.String,
    min: 6,
    max: 6,
    required: true
  },
  {
    name: 'password',
    type: TypeFieldValidation.String,
    min: 6,
    max: 20,
    required: true
  },
  {
    name: 'password_confirmation',
    type: TypeFieldValidation.String,
    sameTo: 'password'
  }
])
