import { UpdateEntityDTO } from '@/domain/common'
import {
  ModuleAccessRuleModel,
  mockModuleAccessRuleModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule/'
const accessRule = AuthenticationAccessRules.UpdateModuleAccessRules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let updateModuleAccessRuleDTO: UpdateEntityDTO<ModuleAccessRuleModel>
let currentModuleAccessRule: ModuleAccessRuleModel
let updatedModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentModuleAccessRule.id): string => `${url}/${id}`

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url: getUrl(),
  field,
  method: HttpMethod.put,
  body: updateModuleAccessRuleDTO,
  accessTokenName,
  accessToken
})

describe('PUT /authentication/module-access-rule/:module_access_rule_id - Update a ModuleAccessRule By Id', () => {
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
    updateModuleAccessRuleDTO = mockModuleAccessRuleModel()
    currentModuleAccessRule = mockModuleAccessRuleModel()
    updatedModuleAccessRule = mockModuleAccessRuleModel()
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModuleAccessRule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedModuleAccessRule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .send(updateModuleAccessRuleDTO)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .put(getUrl())
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(updateModuleAccessRuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('ModuleAccessRuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_access_rule_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ ...getDefaultRouteHelperDTO('module_access_rule_id'), url })
      })
    })

    describe('Title validations', () => {
      test('Should return Unprocessable entity status code (422) if title is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('title'))
      })

      test('Should return Unprocessable entity status code (422) if title length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('title'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if title length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('title'), maxLength: 100 })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation(getDefaultRouteHelperDTO('description'))
      })
    })

    describe('RuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if rule_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('rule_key'))
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('rule_key'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('rule_key'), maxLength: 100 })
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
  })
})
