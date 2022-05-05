import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  RefreshAccessTokenDTO,
  mockAccountModel,
  mockRefreshAccessTokenDTO
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-session/'
let refreshAccessTokenDTO: RefreshAccessTokenDTO
let authenticationAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('PUT /authentication/access-session/ - Refresh AccessSession', () => {
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
    refreshAccessTokenDTO = mockRefreshAccessTokenDTO()
    authenticationAccount = mockAccountModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getOne').mockResolvedValue(authenticationAccount)
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccessToken validations', () => {
      test('Should return Unprocessable entity status code (422) if access_token is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.put, field: 'access_token', body: refreshAccessTokenDTO })
      })
    })
  })
})
