import { UpdateEntityDTO } from '@/domain/common'
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
let updateAccountAccessModuleDTO: UpdateEntityDTO<AccountAccessModuleModel>
let currentAccountAccessModule: AccountAccessModuleModel
let updatedAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentAccountAccessModule.id): string => `${url}/${id}`

describe('PUT /authentication/account-access-module/ - Update a AccountAccessModule By Id', () => {
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
    updateAccountAccessModuleDTO = mockAccountAccessModuleModel()
    currentAccountAccessModule = mockAccountAccessModuleModel()
    updatedAccountAccessModule = mockAccountAccessModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccountAccessModule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedAccountAccessModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .send(updateAccountAccessModuleDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountAccessModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_access_module_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.put, field: 'account_access_module_id' })
      })
    })

    describe('AccountId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'account_id', body: updateAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if account_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'account_id', body: updateAccountAccessModuleDTO })
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_id', body: updateAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_id', body: updateAccountAccessModuleDTO })
      })
    })

    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'access_profile_id', body: updateAccountAccessModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'access_profile_id', body: updateAccountAccessModuleDTO })
      })
    })
  })
})
