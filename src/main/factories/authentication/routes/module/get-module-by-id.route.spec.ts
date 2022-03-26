import { application } from '@/main/application/setup/application'
import {
  ModuleModel,
  mockModuleModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { ConfigSetup } from '@/main/application/config'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module/'
const accessRule = AuthenticationAccessRules.ShowModules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let currentModule: ModuleModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/module/:module_id - Get a Module By Id', () => {
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
    currentModule = mockModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .get(`${url}/${currentModule.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .delete(`${url}/${currentModule.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })
})
