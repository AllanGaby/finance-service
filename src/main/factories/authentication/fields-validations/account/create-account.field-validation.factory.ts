import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateAccountFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'email',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    email: true,
    required: true
  },
  {
    name: 'identification',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100
  },
  {
    name: 'password',
    type: TypeFieldValidation.String,
    min: 6,
    max: 20,
    required: true
  },
  {
    name: 'confirmation_password',
    type: TypeFieldValidation.String,
    min: 6,
    max: 20,
    required: true,
    sameTo: 'password'
  }
])
