import { CreateEntityDTO } from '@/domain/common'
import {
  ModuleModel,
  mockModuleModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { RouteHelpers, CommonRouteHelperDTO } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module/'
const accessRule = AuthenticationAccessRules.CreateModules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let createModuleDTO: CreateEntityDTO<ModuleModel>
let createdModule: ModuleModel
let server: http.Server
let agent: SuperAgentTest

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url,
  field,
  method: HttpMethod.post,
  body: createModuleDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'create').mockResolvedValue(createdModule)
  })

  describe('Created Status Code (201)', () => {
    test('Should return Created status code(201) if succeeds', async () => {
      await agent
        .post(url)
        .send(createModuleDTO)
        .set(accessTokenName, accessToken)
        .expect(HttpStatusCode.created)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .post(url)
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(createModuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('Name validations', () => {
      test('Should return Unprocessable entity status code (422) if name is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('name'))
      })

      test('Should return Unprocessable entity status code (422) if name length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ minLength: 3, ...getDefaultRouteHelperDTO('name') })
      })

      test('Should return Unprocessable entity status code (422) if name length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ maxLength: 100, ...getDefaultRouteHelperDTO('name') })
      })
    })

    describe('Description validations', () => {
      test('Should return Unprocessable entity status code (422) if description is not a string', async () => {
        await RouteHelpers.BodyStringValidation(getDefaultRouteHelperDTO('description'))
      })
    })

    describe('ModuleKey validations', () => {
      test('Should return Unprocessable entity status code (422) if module_key is not provided', async () => {
        await RouteHelpers.BodyRequiredValueValidation(getDefaultRouteHelperDTO('module_key'))
      })

      test('Should return Unprocessable entity status code (422) if module_key length is smaller than', async () => {
        await RouteHelpers.BodySmallerStringValidation({ minLength: 3, ...getDefaultRouteHelperDTO('module_key') })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ maxLength: 100, ...getDefaultRouteHelperDTO('module_key') })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation(getDefaultRouteHelperDTO('enabled'))
      })
    })
  })
})
