import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateAccessProfileFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'name',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'access_profile_key',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'enabled',
    type: TypeFieldValidation.Boolean
  },
  {
    name: 'module_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true
  },
  {
    name: 'rules_id',
    type: TypeFieldValidation.String,
    uuid: true,
    required: true,
    array: true
  }
])
