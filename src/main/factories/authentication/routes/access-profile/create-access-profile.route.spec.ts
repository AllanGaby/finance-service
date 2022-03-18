import { application } from '@/main/application/setup/application'
import {
  CreateAccessProfileDTO,
  mockCreateAccessProfileDTO,
  AccessProfileModel,
  mockAccessProfileModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
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

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, url, HttpMethod.post, 'name', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, url, HttpMethod.post, 'name', 3, createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, url, HttpMethod.post, 'name', 100, createAccessProfileDTO)
      })
    })

    describe('AccessProfileKey validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, url, HttpMethod.post, 'access_profile_key', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, url, HttpMethod.post, 'access_profile_key', 3, createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, url, HttpMethod.post, 'access_profile_key', 100, createAccessProfileDTO)
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation(agent, url, HttpMethod.post, 'enabled', createAccessProfileDTO)
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, url, HttpMethod.post, 'module_id', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(agent, url, HttpMethod.post, 'module_id', createAccessProfileDTO)
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, url, HttpMethod.post, 'rules_id', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        await RouteHelpers.BodyArrayRequiredValidation(agent, url, HttpMethod.post, 'rules_id', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        await RouteHelpers.BodyArrayValidation(agent, url, HttpMethod.post, 'rules_id', createAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        await RouteHelpers.BodyArrayUuidValidation(agent, url, HttpMethod.post, 'rules_id', createAccessProfileDTO)
      })
    })
  })
})
