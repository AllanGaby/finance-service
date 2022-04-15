import { AuthenticationAccessRules } from '@/domain/authentication'
import { HttpStatusCode } from '@/protocols/http'
import { application } from '@/main/application/setup/application'
import { ConfigSetup } from '@/main/application/config'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { datatype } from 'faker'

const url = '/authentication/module/xlsx'
const accessRule = AuthenticationAccessRules.ListModules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let server: http.Server
let agent: SuperAgentTest

const getURL = (columns: string[]): string => `${url}/${columns.join(',')}`

describe('GET /authentication/module/xlsx/:columns - List Modules And Export to XLSX File', () => {
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
        .get(getURL(['id']))
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.ok)
    })
  })

  describe('BadRequest Status Code(400)', () => {
    test('Should return BadRequest Status Code(400) if only invalid columns is provided', async () => {
      await agent
        .get(getURL([datatype.uuid()]))
        .set(accessTokenName, await RouteHelpers.GetAccessToken([accessRule]))
        .expect(HttpStatusCode.badRequest)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .get(getURL(['id']))
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })
})
