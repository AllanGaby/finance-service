import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  mockAccountModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RecoverCacheByKeyProtocol } from '@/protocols/cache'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { CacheFactory, CacheType } from '@/infrastructure/cache'

import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { CreateAccountRequest, mockCreateAccountRequest } from '@/presentation/authentication'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { mockSettingsModel } from '@/domain/common'

const url = '/authentication/request-recover-password/'
let createAccountRequest: CreateAccountRequest
let createdAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createAccountRequest
})

describe('POST /authentication/request-recover-password/ - Create a new RequestRecoverPassword', () => {
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
    createAccountRequest = mockCreateAccountRequest()
    createdAccount = mockAccountModel()

    jest.spyOn(CacheFactory.getCacheAdapter<RecoverCacheByKeyProtocol>({ cacheType: CacheType.Memory }), 'recover').mockResolvedValue(mockSettingsModel())
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getOne').mockResolvedValue(createdAccount)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccount)
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent code(204) if succeeds', async () => {
      await agent
        .post(url)
        .send(createAccountRequest)
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Email validations', () => {
      test('Should return Unprocessable entity status code (422) if email is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('email'))
      })

      test('Should return Unprocessable entity status code (422) if email is not valid e-mail', async () => {
        await RouteHelpers.BodyEmailValidation(getDefaultRouteHelperDTO('email'))
      })
    })
  })
})
