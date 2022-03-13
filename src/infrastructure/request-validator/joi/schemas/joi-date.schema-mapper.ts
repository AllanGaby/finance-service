import Joi from 'joi'
import { FieldValidationModel } from '@/protocols/request-validator'

export class JoiDateSchemaMapper {
  static getSchema (field: FieldValidationModel): Joi.DateSchema {
    let schema: Joi.DateSchema = Joi.date()
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
