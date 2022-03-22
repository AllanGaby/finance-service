import { application } from '@/main/application/setup/application'
import {
  ModuleAccessRuleModel,
  mockModuleAccessRuleModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule/'
let currentModuleAccessRule: ModuleAccessRuleModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/module-access-rule/:module_access_rule_id - Get a Module By Id', () => {
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
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModuleAccessRule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .get(`${url}/${currentModuleAccessRule.id}`)
        .expect(HttpStatusCode.ok)
    })
  })
})
