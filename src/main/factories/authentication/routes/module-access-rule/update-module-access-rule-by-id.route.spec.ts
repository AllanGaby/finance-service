import { UpdateEntityDTO } from '@/domain/common'
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
let updateModuleAccessRuleDTO: UpdateEntityDTO<ModuleAccessRuleModel>
let currentModuleAccessRule: ModuleAccessRuleModel
let updatedModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentModuleAccessRule.id): string => `${url}/${id}`

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
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModuleAccessRule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedModuleAccessRule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .send(updateModuleAccessRuleDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('ModuleAccessRuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_access_rule_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.put, field: 'module_access_rule_id' })
      })
    })

    describe('Title validations', () => {
      test('Should return Unprocessable entity status code (422) if title is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'title', body: updateModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if title length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'title', minLength: 3, body: updateModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if title length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'title', maxLength: 100, body: updateModuleAccessRuleDTO })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'description', body: updateModuleAccessRuleDTO })
      })
    })

    describe('RuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if rule_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'rule_key', body: updateModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'rule_key', minLength: 3, body: updateModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if rule_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'rule_key', maxLength: 100, body: updateModuleAccessRuleDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_id', body: updateModuleAccessRuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_id', body: updateModuleAccessRuleDTO })
      })
    })
  })
})
