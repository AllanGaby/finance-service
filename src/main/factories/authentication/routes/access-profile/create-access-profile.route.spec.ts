import { application } from '@/main/application/setup/application'
import {
  CreateAccessProfileDTO,
  mockCreateAccessProfileDTO,
  AccessProfileModel,
  mockAccessProfileModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-profile/'
const accessRule = AuthenticationAccessRules.CreateAccessProfiles
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let createAccessProfileDTO: CreateAccessProfileDTO
let createdAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createAccessProfileDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccessProfile)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .set(accessTokenName, accessToken)
        .send(createAccessProfileDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .post(url)
        .send(createAccessProfileDTO)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('name'))
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('name'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('name'), maxLength: 100 })
      })
    })

    describe('AccessProfileKey validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('access_profile_key'))
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('access_profile_key'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('access_profile_key'), maxLength: 100 })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation(getDefaultRouteHelperDTO('enabled'))
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('module_id'))
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(getDefaultRouteHelperDTO('module_id'))
      })
    })

    describe('RulesId validations', () => {
      test('Should return Unprocessable entity status code (422) if rules_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('rules_id'))
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a empty list', async () => {
        await RouteHelpers.BodyArrayRequiredValidation(getDefaultRouteHelperDTO('rules_id'))
      })

      test('Should return Unprocessable entity status code (422) if rules_id is not a array', async () => {
        await RouteHelpers.BodyArrayValidation(getDefaultRouteHelperDTO('rules_id'))
      })

      test('Should return Unprocessable entity status code (422) if rules_id is a invalid array', async () => {
        await RouteHelpers.BodyArrayUuidValidation(getDefaultRouteHelperDTO('rules_id'))
      })
    })
  })
})
