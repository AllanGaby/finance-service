import { JoiObjectSchemaMapper } from './joi-object.schema-mapper'
import { JoiStringSchemaMapper, JoiBooleanSchemaMapper, JoiNumberSchemaMapper, JoiArraySchemaMapper } from './'
import { mockFieldValidationModel, FieldValidationModel, TypeFieldValidation } from '@/protocols/request-validator'
import { datatype, random } from 'faker'
import Joi from 'joi'

const mockListFieldValidationModel = (allowObject: boolean = true): FieldValidationModel[] => {
  const list: FieldValidationModel[] = []
  const length = datatype.number({ min: 15, max: 50 })
  for (let index = 0; index < length; index++) {
    if (allowObject) {
      list.push(mockFieldValidationModel())
    } else {
      const type = random.arrayElement([
        TypeFieldValidation.String,
        TypeFieldValidation.Number,
        TypeFieldValidation.Boolean
      ])
      list.push(mockFieldValidationModel(type))
    }
  }
  return list
}

describe('JoiObjectSchemaMapper', () => {
  test('Should call getSchema of JoiStringSchemaMapper for all string fields', () => {
    const fields = mockListFieldValidationModel()
    const getSchemaSpy = jest.spyOn(JoiStringSchemaMapper, 'getSchema')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      if (field.type === TypeFieldValidation.String) {
        expect(getSchemaSpy).toHaveBeenCalledWith(field)
      } else {
        expect(getSchemaSpy).not.toHaveBeenCalledWith(field)
      }
    })
  })

  test('Should call getSchema of JoiNumberSchemaMapper for all number fields', () => {
    const fields = mockListFieldValidationModel()
    const getSchemaSpy = jest.spyOn(JoiNumberSchemaMapper, 'getSchema')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      if (field.type === TypeFieldValidation.Number) {
        expect(getSchemaSpy).toHaveBeenCalledWith(field)
      } else {
        expect(getSchemaSpy).not.toHaveBeenCalledWith(field)
      }
    })
  })

  test('Should call getSchema of JoiBooleanSchemaMapper for all boolean fields', () => {
    const fields = mockListFieldValidationModel()
    const getSchemaSpy = jest.spyOn(JoiBooleanSchemaMapper, 'getSchema')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      if (field.type === TypeFieldValidation.Boolean) {
        expect(getSchemaSpy).toHaveBeenCalledWith(field)
      } else {
        expect(getSchemaSpy).not.toHaveBeenCalledWith(field)
      }
    })
  })

  test('Should call getSchema of JoiObjectSchemaMapper for all object fields', () => {
    const fields = mockListFieldValidationModel()
    const getSchemaSpy = jest.spyOn(JoiObjectSchemaMapper, 'getSchema')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      if (field.type === TypeFieldValidation.Object) {
        expect(getSchemaSpy).toHaveBeenCalledWith(field.fields)
      } else {
        expect(getSchemaSpy).not.toHaveBeenCalledWith(field)
      }
    })
  })

  test('Should call getSchema of JoiArraySchemaMapper for all fields with array', () => {
    const fields = mockListFieldValidationModel(false)
    const getSchemaSpy = jest.spyOn(JoiArraySchemaMapper, 'getSchema')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      let schema: Joi.Schema
      switch (field.type) {
        case TypeFieldValidation.String:
          schema = JoiStringSchemaMapper.getSchema(field)
          break
        case TypeFieldValidation.Number:
          schema = JoiNumberSchemaMapper.getSchema(field)
          break
        case TypeFieldValidation.Boolean:
          schema = JoiBooleanSchemaMapper.getSchema(field)
          break
      }

      if (field.array) {
        expect(getSchemaSpy).toHaveBeenCalledWith(field, schema)
      }
    })
  })

  test('Should call correct Joi Schema if sameTo is provided', () => {
    const fields = mockListFieldValidationModel()
    for (let index = 0; index < 10; index++) {
      fields[index].sameTo = datatype.uuid()
    }
    const refSpy = jest.spyOn(Joi, 'ref')
    JoiObjectSchemaMapper.getSchema(fields)
    fields.forEach(field => {
      if (field.sameTo) {
        expect(refSpy).toHaveBeenCalledWith(field.sameTo)
      } else {
        expect(refSpy).not.toHaveBeenCalledWith(field.sameTo)
      }
    })
  })
})
