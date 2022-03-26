import { application } from '@/main/application/setup/application'
import {
  AccessProfileModel,
  AuthenticationAccessRules,
  mockAccessProfileModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-profile/'
const accessRule = AuthenticationAccessRules.DeleteAccessProfiles
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let currentAccessProfile: AccessProfileModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /authentication/access-profile/:access-profile_id - Delete a AccessProfile By Id', () => {
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
    currentAccessProfile = mockAccessProfileModel()
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .delete(`${url}/${currentAccessProfile.id}`)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .delete(`${url}/${currentAccessProfile.id}`)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if access_profile_id is not provided', async () => {
      await agent
        .delete(url)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.delete, field: 'access_profile_id', accessTokenName, accessToken })
      })
    })
  })
})
