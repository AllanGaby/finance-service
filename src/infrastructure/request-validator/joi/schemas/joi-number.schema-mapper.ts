import Joi from 'joi'
import { FieldValidationModel } from '@/protocols/request-validator'

export class JoiNumberSchemaMapper {
  static getSchema (field: FieldValidationModel): Joi.NumberSchema {
    let schema: Joi.NumberSchema = Joi.number()
    if (field.min) {
      schema = schema.min(field.min)
    }
    if (field.max) {
      schema = schema.max(field.max)
    }
    if (field.required) {
      schema = schema.required()
    }
    return schema
  }
}
