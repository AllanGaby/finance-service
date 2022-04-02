import { application } from '@/main/application/setup/application'
import {
  RecoverPasswordDTO,
  mockRecoverPasswordDTO,
  RequestRecoverPasswordModel,
  mockRequestRecoverPasswordModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigurationModel, ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'
import { BCryptAdapter } from '@/infrastructure/cryptography/bcrypt'
import { datatype } from 'faker'

const url = '/authentication/request-recover-password/'
const config: ConfigurationModel = ConfigSetup()
let recoverPasswordDTO: RecoverPasswordDTO
let requestRecoverPassword: RequestRecoverPasswordModel
let server: http.Server
let agent: SuperAgentTest
let publicKey: string

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.patch,
  body: recoverPasswordDTO,
  cryptography: true,
  tokenField: 'token',
  publicKey
})

describe('PATCH /authentication/request-recover-password/ - Recover a AccountPassword', () => {
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
    recoverPasswordDTO = mockRecoverPasswordDTO()
    requestRecoverPassword = mockRequestRecoverPasswordModel()
    jest.spyOn(BCryptAdapter.getInstance(datatype.number(10)), 'compareHash').mockResolvedValue(true)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getOne').mockResolvedValue(requestRecoverPassword)
  })

  describe('NoContent Status Code (204)', () => {
    test('Should return NoContent status code(204) if succeeds', async () => {
      await agent
        .patch(url)
        .send(RouteHelpers.GetBody(recoverPasswordDTO, true, 'token', publicKey))
        .expect(HttpStatusCode.noContent)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('VerificationCode validations', () => {
      test('Should return Unprocessable entity status code (422) if verification_code is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('verification_code'))
      })

      test('Should return Unprocessable entity status code (422) if verification_code length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('verification_code'), minLength: 6 })
      })

      test('Should return Unprocessable entity status code (422) if verification_code length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('verification_code'), maxLength: 6 })
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
