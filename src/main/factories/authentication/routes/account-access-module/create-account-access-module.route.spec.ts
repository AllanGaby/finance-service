import { CreateEntityDTO } from '@/domain/common'
import {
  AccountAccessModuleModel,
  mockAccountAccessModuleModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account-access-module/'
let createAccountAccessModuleDTO: CreateEntityDTO<AccountAccessModuleModel>
let createdAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

describe('POST /authentication/account-access-module/ - Create a new AccountAccessModule', () => {
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
    createAccountAccessModuleDTO = mockAccountAccessModuleModel()
    createdAccountAccessModule = mockAccountAccessModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccountAccessModule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createAccountAccessModuleDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'account_id', body: createAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if account_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url, method: HttpMethod.post, field: 'account_id', body: createAccountAccessModuleDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url, method: HttpMethod.post, field: 'module_id', body: createAccountAccessModuleDTO })
      })
    })

    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'access_profile_id', body: createAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url, method: HttpMethod.post, field: 'access_profile_id', body: createAccountAccessModuleDTO })
      })
    })
  })
})
