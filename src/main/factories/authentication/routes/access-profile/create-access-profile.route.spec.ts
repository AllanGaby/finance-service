import { application } from '@/main/application/setup/application'
import {
  CreateAccessProfileDTO,
  mockCreateAccessProfileDTO,
  AccessProfileModel,
  mockAccessProfileModel
} from '@/domain/authentication'
import { InvalidForeignKeyError, ViolateUniqueKeyError } from '@/data/common/errors'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { RequestValidatorModel } from '@/protocols/request-validator'
import { datatype, random } from 'faker'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-profile/'
let createAccessProfileDTO: CreateAccessProfileDTO
let createdAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

describe('POST /authentication/access-profile/ - Create a new AccessProfile', () => {
  beforeAll((done) => {
    server = application.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    server && server.close(done)
  })

  beforeEach(async () => {
    createAccessProfileDTO = mockCreateAccessProfileDTO()
    createdAccessProfile = mockAccessProfileModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccessProfile)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createAccessProfileDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Conflict status code(409)', () => {
    test('Should return Conflict status code(409) if AccessProfileRepository return ViolateUniqueKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockRejectedValueOnce(new ViolateUniqueKeyError(datatype.uuid()))
      await agent
        .post(url)
        .send(createAccessProfileDTO)
        .expect(HttpStatusCode.conflict)
    })

    test('Should return Conflict status code(409) if AccessProfileRepository return InvalidForeignKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockRejectedValueOnce(new InvalidForeignKeyError(datatype.uuid()))
      await agent
        .post(url)
        .send(createAccessProfileDTO)
        .expect(HttpStatusCode.conflict)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        delete createAccessProfileDTO.name
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'name', message: '"name" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        createAccessProfileDTO.name = random.alphaNumeric(datatype.number({ min: 1, max: 2 }))
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'name', message: '"name" length must be at least 3 characters long' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        createAccessProfileDTO.name = random.alphaNumeric(datatype.number({ min: 101, max: 200 }))
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'name', message: '"name" length must be less than or equal to 100 characters long' }
          ]
        })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        delete createAccessProfileDTO.enabled
        const response = await agent
          .post(url)
          .send({
            ...createAccessProfileDTO,
            enabled: datatype.uuid()
          })
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'enabled', message: '"enabled" must be a boolean' }
          ]
        })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        delete createAccessProfileDTO.module_id
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'module_id', message: '"module_id" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        createAccessProfileDTO.module_id = datatype.number().toString()
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'module_id', message: '"module_id" must be a valid GUID' }
          ]
        })
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        delete createAccessProfileDTO.rules_id
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'rules_id', message: '"rules_id" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        createAccessProfileDTO.rules_id = []
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'rules_id', message: '"rules_id" does not contain 1 required value(s)' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        delete createAccessProfileDTO.rules_id
        const response = await agent
          .post(url)
          .send({
            ...createAccessProfileDTO,
            rules_id: datatype.number()
          })
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'rules_id', message: '"rules_id" must be an array' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        createAccessProfileDTO.rules_id = [
          datatype.number().toString(),
          datatype.number().toString(),
          datatype.number().toString()
        ]
        const response = await agent
          .post(url)
          .send(createAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        const validations = response.body.error as RequestValidatorModel[]
        validations.forEach((error, index) => {
          if (index !== validations.length - 1) {
            expect(error).toEqual({
              message: `"rules_id[${index}]" must be a valid GUID`,
              path: `rules_id,${index}`
            })
          } else {
            expect(error).toEqual({
              path: 'rules_id',
              message: '"rules_id" does not contain 1 required value(s)'
            })
          }
        })
      })
    })
  })
})
