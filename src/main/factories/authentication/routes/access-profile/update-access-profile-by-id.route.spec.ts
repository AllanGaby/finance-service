import { application } from '@/main/application/setup/application'
import {
  UpdateAccessProfileDTO,
  mockUpdateAccessProfileDTO,
  AccessProfileModel,
  mockAccessProfileModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { RouteHelpers } from '@/main/factories/common/helpers'
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

  describe('Unprocessable entity status code (422)', () => {
    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.put, field: 'access_profile_id' })
      })
    })

    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'name', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'name', minLength: 3, body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'name', maxLength: 100, body: updateAccessProfileDTO })
      })
    })

    describe('AccessProfileKey validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'access_profile_key', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'access_profile_key', minLength: 3, body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'access_profile_key', maxLength: 100, body: updateAccessProfileDTO })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'enabled', body: updateAccessProfileDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'module_id', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'module_id', body: updateAccessProfileDTO })
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'rules_id', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        await RouteHelpers.BodyArrayRequiredValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'rules_id', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        await RouteHelpers.BodyArrayValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'rules_id', body: updateAccessProfileDTO })
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        await RouteHelpers.BodyArrayUuidValidation({ agent, url: `${url}/${currentAccessProfile.id}`, method: HttpMethod.put, field: 'rules_id', body: updateAccessProfileDTO })
      })
    })
  })
})
