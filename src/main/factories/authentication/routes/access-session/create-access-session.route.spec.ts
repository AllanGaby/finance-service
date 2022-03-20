import { application } from '@/main/application/setup/application'
import {
  AccountModel,
  CreateAccessSessionDTO,
  mockAccountModel,
  mockCreateAccessSessionDTO
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigurationModel, ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/access-session/'
const config: ConfigurationModel = ConfigSetup()
let createAccessSessionDTO: CreateAccessSessionDTO
let authenticationAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest
let publicKey: string

describe('POST /authentication/access-session/ - Create a new AccessSession', () => {
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
    createAccessSessionDTO = mockCreateAccessSessionDTO()
    authenticationAccount = mockAccountModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getOne').mockResolvedValue(authenticationAccount)
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Login validations', () => {
      test('Should return Unprocessable entity status code (422) if login is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'login', body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })

      test('Should return Unprocessable entity status code (422) if login length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'login', minLength: 3, body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })

      test('Should return Unprocessable entity status code (422) if login length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'login', maxLength: 100, body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })
    })

    describe('Password validations', () => {
      test('Should return Unprocessable entity status code (422) if password is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'password', body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })

      test('Should return Unprocessable entity status code (422) if password length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'password', minLength: 6, body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })

      test('Should return Unprocessable entity status code (422) if password length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'password', maxLength: 20, body: createAccessSessionDTO, cryptography: true, tokenField: 'token', publicKey })
      })
    })
  })
})
