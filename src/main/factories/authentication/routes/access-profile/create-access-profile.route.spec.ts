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
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'name', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'name', minLength: 3, body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'name', maxLength: 100, body: createAccessProfileDTO })
      })
    })

    describe('AccessProfileKey validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'access_profile_key', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'access_profile_key', minLength: 3, body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'access_profile_key', maxLength: 100, body: createAccessProfileDTO })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation({ agent, url, method: HttpMethod.post, field: 'enabled', body: createAccessProfileDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createAccessProfileDTO })
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'rules_id', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        await RouteHelpers.BodyArrayRequiredValidation({ agent, url, method: HttpMethod.post, field: 'rules_id', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        await RouteHelpers.BodyArrayValidation({ agent, url, method: HttpMethod.post, field: 'rules_id', body: createAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        await RouteHelpers.BodyArrayUuidValidation({ agent, url, method: HttpMethod.post, field: 'rules_id', body: createAccessProfileDTO })
      })
    })
  })
})
