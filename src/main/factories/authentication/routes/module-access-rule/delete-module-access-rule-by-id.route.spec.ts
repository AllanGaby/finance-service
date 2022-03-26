import { application } from '@/main/application/setup/application'
import {
  ModuleAccessRuleModel,
  mockModuleAccessRuleModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule/'
const accessRule = AuthenticationAccessRules.DeleteModuleAccessRules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let currentModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /authentication/module-access-rule/:module_access_rule_id - Delete a ModuleAccessRule By Id', () => {
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
    currentModuleAccessRule = mockModuleAccessRuleModel()
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .delete(`${url}/${currentModuleAccessRule.id}`)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .delete(`${url}/${currentModuleAccessRule.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if module_access_rule_id is not provided', async () => {
      await agent
        .delete(url)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('ModuleAccessRuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_access_rule_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.delete, field: 'module_access_rule_id', accessTokenName, accessToken })
      })
    })
  })
})
