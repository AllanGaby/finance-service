import { application } from '@/main/application/setup/application'
import {
  CreateAccountDTO,
  mockCreateAccountDTO,
  AccountModel,
  mockAccountModel
} from '@/domain/authentication'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/account/'
let createAccountDTO: CreateAccountDTO
let createdAccount: AccountModel
let server: http.Server
let agent: SuperAgentTest

describe('POST /authentication/account/ - Create a new Account', () => {
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
    createAccountDTO = mockCreateAccountDTO()
    createdAccount = mockAccountModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdAccount)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createAccountDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(agent, url, HttpMethod.post, 'name', createAccountDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, url, HttpMethod.post, 'name', 3, createAccountDTO)
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, url, HttpMethod.post, 'name', 100, createAccountDTO)
      })
    })

    describe('Identification validations', () => {
      test('Should return Unprocessable entity status code (422) if identification length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation(agent, url, HttpMethod.post, 'identification', 3, createAccountDTO)
      })

      test('Should return Unprocessable entity status code (422) if identification length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation(agent, url, HttpMethod.post, 'identification', 100, createAccountDTO)
      })
    })
  })
})
