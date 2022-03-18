import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  mockAccountModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpStatusCode } from '@/protocols/http'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account/'
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
        .expect(HttpStatusCode.ok)
    })
  })
})
