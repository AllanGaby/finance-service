import { TypeFieldValidation } from '@/protocols/request-validator'

export interface FieldValidationModel {
  name: string
  type: TypeFieldValidation
  values?: string[]
  min?: number
  max?: number
  required?: boolean
  pattern?: RegExp
  sameTo?: string
  email?: boolean
  uuid?: boolean
  array?: boolean
  fields?: FieldValidationModel[]
}
