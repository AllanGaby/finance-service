import { application } from '@/main/application/setup/application'
import { HttpStatusCode } from '@/protocols/http'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule'
let server: http.Server
let agent: SuperAgentTest

describe('GET /authentication/module-access-rule - List ModuleAccessRules', () => {
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
