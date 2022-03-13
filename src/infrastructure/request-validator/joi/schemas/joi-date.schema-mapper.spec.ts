import { JoiDateSchemaMapper } from './joi-date.schema-mapper'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import Joi from 'joi'

describe('JoiDateSchemaMapper', () => {
  test('Should return correct Joi Schema if only name and type is provided', () => {
    const { name, type } = mockFieldValidationModel()
    const schema = JoiDateSchemaMapper.getSchema({
      name,
      type
    })
    expect(schema).toEqual(Joi.date())
  })

  describe('Required is true', () => {
    test('Should return correct Joi Schema if only required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: true
      })
      expect(schema).toEqual(Joi.date().required())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min
      })
      expect(schema).toEqual(Joi.date().min(min).required())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: true,
        max
      })
      expect(schema).toEqual(Joi.date().max(max).required())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.date().min(min).max(max).required())
    })
  })

  describe('Required is false', () => {
    test('Should return correct Joi Schema if only required is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: false
      })
      expect(schema).toEqual(Joi.date())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min
      })
      expect(schema).toEqual(Joi.date().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: false,
        max
      })
      expect(schema).toEqual(Joi.date().max(max))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.date().min(min).max(max))
    })
  })

  describe('Min is provided', () => {
    test('Should return correct Joi Schema if only min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        min
      })
      expect(schema).toEqual(Joi.date().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        min,
        max
      })
      expect(schema).toEqual(Joi.date().min(min).max(max))
    })
  })

  describe('Max is provided', () => {
    test('Should return correct Joi Schema if only max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiDateSchemaMapper.getSchema({
        name,
        type,
        max
      })
      expect(schema).toEqual(Joi.date().max(max))
    })
  })
})
