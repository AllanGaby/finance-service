import { UpdateEntityDTO } from '@/domain/common'
import {
  AccountAccessModuleModel,
  AuthenticationAccessRules,
  mockAccountAccessModuleModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account-access-module/'
const accessRule = AuthenticationAccessRules.UpdateAccountAccessModule
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let updateAccountAccessModuleDTO: UpdateEntityDTO<AccountAccessModuleModel>
let currentAccountAccessModule: AccountAccessModuleModel
let updatedAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentAccountAccessModule.id): string => `${url}/${id}`

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url: getUrl(),
  field,
  method: HttpMethod.put,
  body: updateAccountAccessModuleDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccountAccessModule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedAccountAccessModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .set(accessTokenName, accessToken)
        .send(updateAccountAccessModuleDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .put(getUrl())
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(updateAccountAccessModuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountAccessModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_access_module_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ ...getDefaultRouteHelperDTO('account_access_module_id'), url })
      })
    })

    describe('AccountId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('account_id'))
      })

      test('Should return Unprocessable entity status code (422) if account_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(getDefaultRouteHelperDTO('account_id'))
      })
    })

    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('module_id'))
      })

      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(getDefaultRouteHelperDTO('module_id'))
      })
    })

    describe('AccessProfileId validations', () => {
      test('Should return Unprocessable entity status code (422) if access_profile_id is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('access_profile_id'))
      })

      test('Should return Unprocessable entity status code (422) if access_profile_id is not a uuid', async () => {
        await RouteHelpers.BodyUuidValidation(getDefaultRouteHelperDTO('access_profile_id'))
      })
    })
  })
})
