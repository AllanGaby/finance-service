import { application } from '@/main/application/setup/application'
import { HttpStatusCode } from '@/protocols/http'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account-access-module/'
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/account-access-module - List AccountAccessModules', () => {
  beforeAll((done) => {
    server = application.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  afterAll((done) => {
    server && server.close(done)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .get(url)
        .expect(HttpStatusCode.ok)
    })
  })
})
