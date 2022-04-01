import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateRequestRecoverPasswordFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'email',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    email: true,
    required: true
  }
])
