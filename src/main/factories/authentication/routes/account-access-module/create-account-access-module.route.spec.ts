import { CreateEntityDTO } from '@/domain/common'
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
const accessRule = AuthenticationAccessRules.CreateAccountAccessModule
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let createAccountAccessModuleDTO: CreateEntityDTO<AccountAccessModuleModel>
let createdAccountAccessModule: AccountAccessModuleModel
let server: http.Server
let agent: SuperAgentTest

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createAccountAccessModuleDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccountAccessModule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .set(accessTokenName, accessToken)
        .send(createAccountAccessModuleDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .post(url)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(createAccountAccessModuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
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
