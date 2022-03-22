import { application } from '@/main/application/setup/application'
import {
  AccountAccessModuleModel,
  mockAccountAccessModuleModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account-access-module/'
let currentAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

describe('DELETE /authentication/account-access-module/:account_access_module_id - Delete a AccountAccessModule By Id', () => {
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
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .delete(`${url}/${currentAccountAccessModule.id}`)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('NotFound Status Code 404', () => {
    test('Should return NotFound status code (404) if account_access_module_id is not provided', async () => {
      await agent
        .delete(url)
        .expect(HttpStatusCode.notFound)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountAccessModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_access_module_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.delete, field: 'account_access_module_id' })
      })
    })
  })
})
