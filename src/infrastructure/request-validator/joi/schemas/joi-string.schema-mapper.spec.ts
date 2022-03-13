import { JoiStringSchemaMapper } from './joi-string.schema-mapper'
import { mockFieldValidationModel } from '@/protocols/request-validator'
import Joi from 'joi'

describe('JoiStringSchemaMapper', () => {
  test('Should return correct Joi Schema if only name and type is provided', () => {
    const { name, type } = mockFieldValidationModel()
    const schema = JoiStringSchemaMapper.getSchema({
      name,
      type
    })
    expect(schema).toEqual(Joi.string())
  })

  describe('Required is true', () => {
    test('Should return correct Joi Schema if only required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min
      })
      expect(schema).toEqual(Joi.string().min(min).required())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        max
      })
      expect(schema).toEqual(Joi.string().max(max).required())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max).required())
    })

    test('Should return correct Joi Schema if email is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        email: true
      })
      expect(schema).toEqual(Joi.string().email().required())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid().required())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern).required())
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: true,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values).required())
    })
  })

  describe('Required is false', () => {
    test('Should return correct Joi Schema if only required is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false
      })
      expect(schema).toEqual(Joi.string())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max))
    })

    test('Should return correct Joi Schema if email is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        email: true
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        required: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values))
    })
  })

  describe('Email is true', () => {
    test('Should return correct Joi Schema if only email is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        min
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        max
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().email())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().email().pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: true,
        values
      })
      expect(schema).toEqual(Joi.string().email().valid(...values))
    })
  })

  describe('Email is false', () => {
    test('Should return correct Joi Schema if only email is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false
      })
      expect(schema).toEqual(Joi.string())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max))
    })

    test('Should return correct Joi Schema if required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if uuid is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        email: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values))
    })
  })

  describe('Uuid is true', () => {
    test('Should return correct Joi Schema if only uuid is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true,
        min
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true,
        max
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().uuid())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true,
        pattern
      })
      expect(schema).toEqual(Joi.string().uuid().pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: true,
        values
      })
      expect(schema).toEqual(Joi.string().uuid().valid(...values))
    })
  })

  describe('Uuid is false', () => {
    test('Should return correct Joi Schema if only uuid is provided and is false', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false
      })
      expect(schema).toEqual(Joi.string())
    })

    test('Should return correct Joi Schema if min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        min
      })
      expect(schema).toEqual(Joi.string().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        max
      })
      expect(schema).toEqual(Joi.string().max(max))
    })

    test('Should return correct Joi Schema if min and max are provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max))
    })

    test('Should return correct Joi Schema if required is provided and is true', () => {
      const { name, type } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        required: true
      })
      expect(schema).toEqual(Joi.string().required())
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        pattern
      })
      expect(schema).toEqual(Joi.string().pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        uuid: false,
        values
      })
      expect(schema).toEqual(Joi.string().valid(...values))
    })
  })

  describe('Min is provided', () => {
    test('Should return correct Joi Schema if only min is provided', () => {
      const { name, type, min } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min
      })
      expect(schema).toEqual(Joi.string().min(min))
    })

    test('Should return correct Joi Schema if max is provided', () => {
      const { name, type, min, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        max
      })
      expect(schema).toEqual(Joi.string().min(min).max(max))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, min, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        pattern
      })
      expect(schema).toEqual(Joi.string().min(min).pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, min, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        min,
        values
      })
      expect(schema).toEqual(Joi.string().min(min).valid(...values))
    })
  })

  describe('Max is provided', () => {
    test('Should return correct Joi Schema if only max is provided', () => {
      const { name, type, max } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max
      })
      expect(schema).toEqual(Joi.string().max(max))
    })

    test('Should return correct Joi Schema if pattern is provided', () => {
      const { name, type, max, pattern } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max,
        pattern
      })
      expect(schema).toEqual(Joi.string().max(max).pattern(pattern))
    })

    test('Should return correct Joi Schema if values is provided', () => {
      const { name, type, max, values } = mockFieldValidationModel()
      const schema = JoiStringSchemaMapper.getSchema({
        name,
        type,
        max,
        values
      })
      expect(schema).toEqual(Joi.string().max(max).valid(...values))
    })
  })
})
