import { CreateEntityDTO } from '@/domain/common'
import {
  ModuleModel,
  mockModuleModel
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { RouteHelpers } from '@/main/factories/common/helpers'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module/'
let createModuleDTO: CreateEntityDTO<ModuleModel>
let createdModule: ModuleModel
let server: http.Server
let agent: SuperAgentTest

describe('POST /authentication/module/ - Create a new Module', () => {
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
    createModuleDTO = mockModuleModel()
    createdModule = mockModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdModule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createModuleDTO)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'name', body: createModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'name', minLength: 3, body: createModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'name', maxLength: 100, body: createModuleDTO })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation({ agent, url, method: HttpMethod.post, field: 'description', body: createModuleDTO })
      })
    })

    describe('ModuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if module_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url, method: HttpMethod.post, field: 'module_key', body: createModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url, method: HttpMethod.post, field: 'module_key', minLength: 3, body: createModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url, method: HttpMethod.post, field: 'module_key', maxLength: 100, body: createModuleDTO })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation({ agent, url, method: HttpMethod.post, field: 'enabled', body: createModuleDTO })
      })
    })
  })
})
