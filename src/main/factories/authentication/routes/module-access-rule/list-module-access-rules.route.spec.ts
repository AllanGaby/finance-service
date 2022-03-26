import { AuthenticationAccessRules } from '@/domain/authentication'
import { ConfigSetup } from '@/main/application/config'
import { application } from '@/main/application/setup/application'
import { RouteHelpers } from '@/main/factories/common/helpers'
import { HttpStatusCode } from '@/protocols/http'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module-access-rule'
const accessRule = AuthenticationAccessRules.ListModuleAccessRules
const accessTokenName = ConfigSetup().authentication.accessTokenName
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
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .get(url)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })
})
