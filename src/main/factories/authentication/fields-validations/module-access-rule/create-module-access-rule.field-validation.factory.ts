import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeCreateModuleAccessRuleFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'title',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'description',
    type: TypeFieldValidation.String
  },
  {
    name: 'rule_key',
    type: TypeFieldValidation.String,
    min: 3,
    max: 100,
    required: true
  },
  {
    name: 'module_id',
    type: TypeFieldValidation.String,
    required: true,
    uuid: true
  }
])
