import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateAccountAccessModuleFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'account_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'module_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'access_profile_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  }
])
