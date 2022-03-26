import { RecoverAccessSessionMiddleware } from './recover-access-session.middleware'
import { AccessSessionModel, GetAccessSessionByTokenUseCaseSpy, mockAccessSessionModel } from '@/domain/authentication'
import {
  FieldValidationModel,
  mockFieldValidationModel,
  mockRequestValidatorModel,
  RequestValidatorProtocolSpy
} from '@/protocols/request-validator'
import { AuthenticatedTokenHeaderRequest, mockAuthenticatedTokenHeaderRequest } from '@/presentation/authentication'
import { database, datatype } from 'faker'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { AccessDeniedError, UnauthorizedError } from '@/data/authentication/errors'

type sutTypes = {
  sut: RecoverAccessSessionMiddleware
  request: HttpRequest<any, AuthenticatedTokenHeaderRequest>
  accessSession: AccessSessionModel
  fieldToValidation: FieldValidationModel[]
  validator: RequestValidatorProtocolSpy
  getAccessSessionByTokenUseCase: GetAccessSessionByTokenUseCaseSpy
  accessTokenName: string
  accessRules: string[]
}

const makeSut = (accessRules: string[] = []): sutTypes => {
  const fieldToValidation: FieldValidationModel[] = [
    mockFieldValidationModel()
  ]
  const validator = new RequestValidatorProtocolSpy()
  const accessSession = mockAccessSessionModel()
  const getAccessSessionByTokenUseCase = new GetAccessSessionByTokenUseCaseSpy()
  jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken').mockResolvedValue(accessSession)
  const accessTokenName = database.column()
  const sut = new RecoverAccessSessionMiddleware(
    fieldToValidation,
    validator,
    getAccessSessionByTokenUseCase,
    accessTokenName,
    accessRules
  )
  return {
    sut,
    request: mockAuthenticatedTokenHeaderRequest(accessTokenName),
    accessSession,
    fieldToValidation,
    validator,
    getAccessSessionByTokenUseCase,
    accessTokenName,
    accessRules
  }
}

describe('RecoverAccessSessionMiddleware', () => {
  describe('Validate data request', () => {
    test('Should call validator with correct values', async () => {
      const { sut, request, validator, fieldToValidation } = makeSut()
      const validateSpy = jest.spyOn(validator, 'validate')
      await sut.handle(request)
      expect(validateSpy).toHaveBeenCalledWith(fieldToValidation, request.headers)
    })

    test('Should return Unauthorized if validator return any value', async () => {
      const { sut, request, validator } = makeSut()
      jest.spyOn(validator, 'validate').mockReturnValue([mockRequestValidatorModel()])
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.unauthorized(new UnauthorizedError()))
    })
  })

  describe('Search AccessSession', () => {
    test('Should call getAccessSessionByTokenUseCase with correct values', async () => {
      const { sut, request, getAccessSessionByTokenUseCase, accessTokenName } = makeSut()
      const getByTokenSpy = jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken')
      await sut.handle(request)
      expect(getByTokenSpy).toHaveBeenCalledWith(request.headers[accessTokenName])
    })

    test('Should return Forbidden if getAccessSessionByTokenUseCase return undefined', async () => {
      const { sut, request, getAccessSessionByTokenUseCase } = makeSut()
      jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken').mockResolvedValue(undefined)
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
    })

    test('Should return Forbidden if getAccessSessionByTokenUseCase fails', async () => {
      const { sut, request, getAccessSessionByTokenUseCase } = makeSut()
      jest.spyOn(getAccessSessionByTokenUseCase, 'getByToken').mockRejectedValue(new Error())
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
    })
  })

  describe('Check AccessSession rules', () => {
    test('Should return ok if accessRules is not provided', async () => {
      const accessRules = undefined
      const { sut, request, accessSession } = makeSut(accessRules)
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok(request.body, {
        ...request.headers,
        access_session: accessSession
      }, request.queryParams, request.params))
    })

    test('Should return ok if accessRules is provided and accessSession has this accessRule', async () => {
      const accessRuleToValidation = datatype.uuid()
      const accessRules = [
        accessRuleToValidation
      ]
      const { sut, request, accessSession } = makeSut(accessRules)
      const modulesKeys = Object.keys(accessSession.modules)
      accessSession.modules[modulesKeys[0]].access_profile_rules.push(accessRuleToValidation)
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok(request.body, {
        ...request.headers,
        access_session: accessSession
      }, request.queryParams, request.params))
    })

    test('Should return forbidden if accessRules is provided and accessSession hasnt this accessRule', async () => {
      const accessRuleToValidation = datatype.uuid()
      const accessRules = [
        accessRuleToValidation
      ]
      const { sut, request, accessSession } = makeSut(accessRules)
      Object.keys(accessSession.modules).forEach(moduleKey => {
        const module = accessSession.modules[moduleKey]
        module.access_profile_rules = module.access_profile_rules.filter(item => item !== accessRuleToValidation)
      })
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.forbidden(new AccessDeniedError()))
    })
  })
})
