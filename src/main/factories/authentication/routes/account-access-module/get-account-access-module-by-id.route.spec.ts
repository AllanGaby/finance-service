import { application } from '@/main/application/setup/application'
import {
  AccountAccessModuleModel,
  AuthenticationAccessRules,
  mockAccountAccessModuleModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { RouteHelpers } from '@/main/factories/common/helpers'

const url = '/authentication/account-access-module/'
const accessRule = AuthenticationAccessRules.ShowAccountAccessModule
const accessTokenName = ConfigSetup().authentication.accessTokenName
let currentAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/account-access-module/:account_access_module_id - Get a AccountAccessModule By Id', () => {
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
    currentAccountAccessModule = mockAccountAccessModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccountAccessModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .get(`${url}/${currentAccountAccessModule.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .get(`${url}/${currentAccountAccessModule.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })
})
