import { CreateEntityDTO } from '@/domain/common'
import {
  ModuleAccessRuleModel,
  mockModuleAccessRuleModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule/'
let createModuleAccessRuleDTO: CreateEntityDTO<ModuleAccessRuleModel>
let createdModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

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
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdModuleAccessRule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createModuleAccessRuleDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Title validations', () => {
      test('Should return Unprocessable entity status code (422) if title is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'title', body: createModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if title length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'title', minLength: 3, body: createModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if title length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'title', maxLength: 100, body: createModuleAccessRuleDTO })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation({ agent, url, method: HttpMethod.post, field: 'description', body: createModuleAccessRuleDTO })
      })
    })

    describe('RuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if rule_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'rule_key', body: createModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'rule_key', minLength: 3, body: createModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'rule_key', maxLength: 100, body: createModuleAccessRuleDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createModuleAccessRuleDTO })
      })
    })
  })
})
