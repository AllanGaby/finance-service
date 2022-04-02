import {
  AccountModel,
  AuthenticationAccessRules,
  mockAccountModel,
  mockUpdateAccountDTO,
  UpdateAccountDTO
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account/'
const accessRule = AuthenticationAccessRules.UpdateAccount
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let updateAccountDTO: UpdateAccountDTO
let currentAccount: AccountModel
let updatedAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentAccount.id): string => `${url}/${id}`

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url: getUrl(),
  field,
  method: HttpMethod.patch,
  body: updateAccountDTO,
  accessTokenName,
  accessToken
})

describe('PATCH /authentication/account/ - Update a Account By Id', () => {
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
    updateAccountDTO = mockUpdateAccountDTO()
    currentAccount = mockAccountModel()
    updatedAccount = mockAccountModel()
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentAccount)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedAccount)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .patch(getUrl())
        .set(accessTokenName, accessToken)
        .send(updateAccountDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .patch(getUrl())
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(updateAccountDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('AccountId validations', () => {
      test('Should return Unprocessable entity status code (422) if account_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ ...getDefaultRouteHelperDTO('account_id'), url })
      })
    })

    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('name'))
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('name'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('name'), maxLength: 100 })
      })
    })
  })
})
