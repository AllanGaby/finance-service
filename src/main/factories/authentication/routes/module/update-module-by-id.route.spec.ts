import { UpdateEntityDTO } from '@/domain/common'
import {
  ModuleModel,
  mockModuleModel,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { HttpMethod, HttpStatusCode } from '@/protocols/http'
import { CommonMemoryRepository } from '@/infrastructure/repositories'
import { application } from '@/main/application/setup/application'
import { CommonRouteHelperDTO, RouteHelpers } from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import http from 'http'
import supertest, { SuperAgentTest } from 'supertest'

const url = '/authentication/module/'
const accessRule = AuthenticationAccessRules.UpdateModules
const accessTokenName = ConfigSetup().authentication.accessTokenName
let accessToken: string
let updateModuleDTO: UpdateEntityDTO<ModuleModel>
let currentModule: ModuleModel
let updatedModule: ModuleModel
let server: http.Server
let agent: SuperAgentTest

const getUrl = (id: string = currentModule.id): string => `${url}/${id}`

const getDefaultRouteHelperDTO = (field: string): CommonRouteHelperDTO => ({
  agent,
  url: getUrl(),
  field,
  method: HttpMethod.put,
  body: updateModuleDTO,
  accessTokenName,
  accessToken
})

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
    accessToken = await RouteHelpers.GetAccessToken([accessRule])
    jest.spyOn(CommonMemoryRepository.getRepository(), 'getById').mockResolvedValue(currentModule)
    jest.spyOn(CommonMemoryRepository.getRepository(), 'update').mockResolvedValue(updatedModule)
  })

  describe('Ok Status Code (200)', () => {
    test('Should return Ok status code(200) if succeeds', async () => {
      await agent
        .put(getUrl())
        .set(accessTokenName, accessToken)
        .send(updateModuleDTO)
        .expect(HttpStatusCode.ok)
    })
  })

  describe('Forbidden Status Code(403)', () => {
    test('Should return Forbidden Status Code(403) if access token hasnt access rule', async () => {
      await agent
        .put(getUrl())
        .set(accessTokenName, await RouteHelpers.GetAccessToken([]))
        .send(updateModuleDTO)
        .expect(HttpStatusCode.forbidden)
    })
  })

  describe('Unprocessable entity status code (422)', () => {
    describe('ModuleId validations', () => {
      test('Should return Unprocessable entity status code (422) if module_id is not a uuid', async () => {
        await RouteHelpers.URLParamUuidValidation({ ...getDefaultRouteHelperDTO('module_id'), url })
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
        await RouteHelpers.BodySmallerStringValidation({ ...getDefaultRouteHelperDTO('module_key'), minLength: 3 })
      })

      test('Should return Unprocessable entity status code (422) if module_key length is bigger than', async () => {
        await RouteHelpers.BodyBiggerStringValidation({ ...getDefaultRouteHelperDTO('module_key'), maxLength: 100 })
      })
    })

    describe('Enabled validations', () => {
      test('Should return Unprocessable entity status code (422) if enabled is not a boolean', async () => {
        await RouteHelpers.BodyBooleanValidation(getDefaultRouteHelperDTO('enabled'))
      })
    })
  })
})
