import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  mockAccountModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { CreateAccountRequest, mockCreateAccountRequest } from '@/presentation/authentication'
import { ConfigurationModel, ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account/'
const config: ConfigurationModel = ConfigSetup()
let createAccountRequest: CreateAccountRequest
let createdAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest
let publicKey: string

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createAccountRequest,
  cryptography: true,
  tokenField: 'token',
  publicKey
})

describe('POST /authentication/account/ - Create a new Account', () => {
  beforeAll((done) => {
    server = application.listen(4000, (): void => {
      agent = supertest.agent(server)
      done()
    })
  })

  beforeAll(async () => {
    publicKey = await config.security.getPublicKey()
  })

  afterAll((done) => {
    server && server.close(done)
  })

  beforeEach(async () => {
    createAccountRequest = mockCreateAccountRequest()
    createdAccount = mockAccountModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccount)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(RouteHelpers.GetBody(createAccountRequest, true, 'token', publicKey))
        .expect(HttpStatusCode.created)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
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

    describe('Email validations', () => {
      test('Should return Unprocessable entity status code (422) if email is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('email'))
      })

      test('Should return Unprocessable entity status code (422) if email is not valid e-mail', async () => {
        await RouteHelpers.BodyEmailValidation(getDefaultRouteHelperDTO('email'))
      })
    })

    describe('Identification validations', () => {
      test('Should return Unprocessable entity status code (422) if identification length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('identification'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if identification length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('identification'), maxLength: 100 })
      })
    })

    describe('Password validations', () => {
      test('Should return Unprocessable entity status code (422) if password is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('password'))
      })

      test('Should return Unprocessable entity status code (422) if password length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('password'), minLength: 6 })
      })

      test('Should return Unprocessable entity status code (422) if password length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('password'), maxLength: 20 })
      })
    })

    describe('PasswordConfirmation validations', () => {
      test('Should return Unprocessable entity status code (422) if password_confirmation is different than password', async () => {
        await RouteHelpers.BodyPasswordConfirmationValidation({ ...getDefaultRouteHelperDTO('password_confirmation'), sameTo: 'password' })
      })
    })
  })
})
