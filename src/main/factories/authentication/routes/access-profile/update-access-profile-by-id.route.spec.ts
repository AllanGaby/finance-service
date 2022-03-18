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
import { datatype } from 'faker'
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
        await RouteHelpers.BodyRequiredValueValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'name', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'name', 3, updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'name', 100, updateAccessProfileDTO)
      })
    })

    describe('AccessProfileKey validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'access_profile_key', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'access_profile_key', 3, updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'access_profile_key', 100, updateAccessProfileDTO)
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'enabled', updateAccessProfileDTO)
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'module_id', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'module_id', updateAccessProfileDTO)
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'rules_id', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        await RouteHelpers.BodyArrayRequiredValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'rules_id', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        await RouteHelpers.BodyArrayValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'rules_id', updateAccessProfileDTO)
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        await RouteHelpers.BodyArrayUuidValidation(agent, `${url}/${currentAccessProfile.id}`, HttpMethod.put, 'rules_id', updateAccessProfileDTO)
      })
    })
  })
})
