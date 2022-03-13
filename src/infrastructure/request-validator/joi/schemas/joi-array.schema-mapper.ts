import Joi from 'joi'
import { FieldValidationModel } from '@/protocols/request-validator'

export class JoiArraySchemaMapper {
  static getSchema (field: FieldValidationModel, schema: Joi.Schema): Joi.ArraySchema {
    let arraySchema: Joi.ArraySchema = Joi.array().items(schema)
    if (field.required) {
      arraySchema = arraySchema.required()
    }
    if (field.min) {
      arraySchema = arraySchema.min(field.min)
    }
    if (field.max) {
      arraySchema = arraySchema.max(field.max)
    }
    return arraySchema
  }
}
