import { UpdateEntityDTO } from '@/domain/common'
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
let updateModuleDTO: UpdateEntityDTO<ModuleModel>
let currentModule: ModuleModel
let updatedModule: ModuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentModule.id): string => `${url}/${id}`

describe('PUT /authentication/module/:module_id - Update a Module By Id', () => {
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
    updateModuleDTO = mockModuleModel()
    currentModule = mockModuleModel()
    updatedModule = mockModuleModel()
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .send(updateModuleDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ agent, url, method: HttpMethod.put, field: 'module_id' })
      })
    })

    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'name', body: updateModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'name', minLength: 3, body: updateModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'name', maxLength: 100, body: updateModuleDTO })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'description', body: updateModuleDTO })
      })
    })

    describe('ModuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if module_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_key', body: updateModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_key', minLength: 3, body: updateModuleDTO })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'module_key', maxLength: 100, body: updateModuleDTO })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation({ agent, url: getUrl(), method: HttpMethod.put, field: 'enabled', body: updateModuleDTO })
      })
    })
  })
})
