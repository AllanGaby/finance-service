import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  AuthenticationAccessRules,
  mockAccountModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { RouteHelpers } from '@/main/factories/common/helpers'

const url = '/authentication/account/'
const accessRule = AuthenticationAccessRules.ShowAccount
const accessTokenName = ConfigSetup().authentication.accessTokenName
let currentAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/account/:account_id - Get a Account By Id', () => {
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
    currentAccount = mockAccountModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccount)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .get(`${url}/${currentAccount.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .delete(`${url}/${currentAccount.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })
})
