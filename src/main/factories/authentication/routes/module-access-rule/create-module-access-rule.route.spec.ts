import { CreateEntityDTO } from '@/domain/common'
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
const accessRule = AuthenticationAccessRules.CreateModuleAccessRules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let createModuleAccessRuleDTO: CreateEntityDTO<ModuleAccessRuleModel>
let createdModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createModuleAccessRuleDTO,
  accessTokenName,
  accessToken
})

describe('POST /authentication/module-access-rule/ - Create a new ModuleAccessRule', () => {
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
    createModuleAccessRuleDTO = mockModuleAccessRuleModel()
    createdModuleAccessRule = mockModuleAccessRuleModel()
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdModuleAccessRule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .set(accessTokenName, accessToken)
        .send(createModuleAccessRuleDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .post(url)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(createModuleAccessRuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
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
