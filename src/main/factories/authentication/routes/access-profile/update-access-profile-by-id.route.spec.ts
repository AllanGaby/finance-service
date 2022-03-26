import { application } from '@/main/application/setup/application'
import {
  UpdateAccessProfileDTO,
  mockUpdateAccessProfileDTO,
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
const accessRule = AuthenticationAccessRules.UpdateAccessProfiles
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let updateAccessProfileDTO: UpdateAccessProfileDTO
let currentAccessProfile: AccessProfileModel
let updatedAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

const getURL = (): string => `${url}/${currentAccessProfile.id}`

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url: getURL(),
  field,
  method: HttpMethod.put,
  body: updateAccessProfileDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccessProfile)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedAccessProfile)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getURL())
        .set(accessTokenName, accessToken)
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .put(getURL())
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(updateAccessProfileDTO)
        .expect(HttpStatusCode.forbidden)
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
        await RouteHelpers.URLParamUuidValidation({ ...getDefaultRouteHelperDTO('access_profile_id'), url })
      })
    })

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
