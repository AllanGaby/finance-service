import { application } from '@/main/application/setup/application'
import {
  UpdateAccessProfileDTO,
  mockUpdateAccessProfileDTO,
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
let updateAccessProfileDTO: UpdateAccessProfileDTO
let currentAccessProfile: AccessProfileModel
let updatedAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

describe('PUT /authentication/access-profile/:access-profile_id - Update a AccessProfile By Id', () => {
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
    updateAccessProfileDTO = mockUpdateAccessProfileDTO()
    updatedAccessProfile = mockAccessProfileModel()
    currentAccessProfile = mockAccessProfileModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccessProfile)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedAccessProfile)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(`${url}/${currentAccessProfile.id}`)
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if access_profile_id is not provided', async () => {
      await agent
        .put(url)
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Conflict status code(409)', () => {
    test('Should return Conflict status code(409) if AccessProfileRepository return ViolateUniqueKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockRejectedValueOnce(new ViolateUniqueKeyError(datatype.uuid()))
      await agent
        .put(`${url}/${currentAccessProfile.id}`)
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.conflict)
    })

    test('Should return Conflict status code(409) if AccessProfileRepository return InvalidForeignKeyError', async () => {
      jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockRejectedValueOnce(new InvalidForeignKeyError(datatype.uuid()))
      await agent
        .put(`${url}/${currentAccessProfile.id}`)
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.conflict)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        const response = await agent
          .put(`${url}/${datatype.number()}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'access_profile_id', message: '"access_profile_id" must be a valid GUID' }
          ]
        })
      })
    })

    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        delete updateAccessProfileDTO.name
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'name', message: '"name" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        updateAccessProfileDTO.name = random.alphaNumeric(datatype.number({ min: 1, max: 2 }))
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'name', message: '"name" length must be at least 3 characters long' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        updateAccessProfileDTO.name = random.alphaNumeric(datatype.number({ min: 101, max: 200 }))
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
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
        delete updateAccessProfileDTO.enabled
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send({
            ...updateAccessProfileDTO,
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
        delete updateAccessProfileDTO.module_id
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'module_id', message: '"module_id" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        updateAccessProfileDTO.module_id = datatype.number().toString()
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
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
        delete updateAccessProfileDTO.rules_id
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'rules_id', message: '"rules_id" is required' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        updateAccessProfileDTO.rules_id = []
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
          .expect(HttpStatusCode.unprocessableEntity)
        expect(response.body).toEqual({
          error: [
            { path: 'rules_id', message: '"rules_id" does not contain 1 required value(s)' }
          ]
        })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        delete updateAccessProfileDTO.rules_id
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send({
            ...updateAccessProfileDTO,
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
        updateAccessProfileDTO.rules_id = [
          datatype.number().toString(),
          datatype.number().toString(),
          datatype.number().toString()
        ]
        const response = await agent
          .put(`${url}/${currentAccessProfile.id}`)
          .send(updateAccessProfileDTO)
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
