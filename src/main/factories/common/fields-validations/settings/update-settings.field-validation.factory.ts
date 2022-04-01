import { FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'

export const makeUpdateSettingsFieldsValidations = (): FieldValidationModel[] => ([
  {
    name: 'smtp_sender_email',
    type: TypeFieldValidation.String,
    email: true,
    min: 3,
    max: 100
  },
  {
    name: 'smtp_sender_name',
    type: TypeFieldValidation.String
  },
  {
    name: 'smtp_auth_account',
    type: TypeFieldValidation.String
  },
  {
    name: 'smtp_auth_password',
    type: TypeFieldValidation.String
  },
  {
    name: 'smtp_service',
    type: TypeFieldValidation.String
  },
  {
    name: 'enabled_send_mail',
    type: TypeFieldValidation.Boolean
  }
])
