import { CheckBusinessRuleUseCaseSpy, EntityModel, mockEntityModel, mockSettingsModel } from '@/domain/common'
import { CheckBusinessRuleMiddleware } from './check-business-rule.middleware'
import { HttpHelper, HttpRequest } from '@/protocols/http'
import { mockRequest, SettingsHeaderRequest } from '@/presentation/common'

type sutTypes = {
  sut: CheckBusinessRuleMiddleware
  checkBusinessRuleUseCase: CheckBusinessRuleUseCaseSpy
  request: HttpRequest<any, SettingsHeaderRequest>
}

const makeSut = (): sutTypes => {
  const checkBusinessRuleUseCase = new CheckBusinessRuleUseCaseSpy()
  const sut = new CheckBusinessRuleMiddleware(checkBusinessRuleUseCase)
  return {
    sut,
    checkBusinessRuleUseCase,
    request: mockRequest<EntityModel, SettingsHeaderRequest>(
      mockEntityModel(),
      {
        settings: mockSettingsModel()
      }
    )
  }
}

describe('CheckBusinessRuleMiddleware', () => {
  describe('Call checkBusinessRuleUseCase', () => {
    test('Should call checkBusinessRuleUseCase with correct value', async () => {
      const { sut, checkBusinessRuleUseCase, request } = makeSut()
      const checkSpy = jest.spyOn(checkBusinessRuleUseCase, 'check')
      await sut.handle(request)
      expect(checkSpy).toHaveBeenCalledWith({
        ...request.body,
        ...request.params
      }, request.headers.settings)
    })

    test('Should fails if checkBusinessRuleUseCase fails', async () => {
      const { sut, checkBusinessRuleUseCase, request } = makeSut()
      const error = new Error()
      jest.spyOn(checkBusinessRuleUseCase, 'check').mockRejectedValue(error)
      const promise = sut.handle(request)
      expect(promise).rejects.toThrowError(error)
    })
  })

  describe('Return correct value', () => {
    test('Should return Ok Status Code (200) with correct values', async () => {
      const { sut, request, checkBusinessRuleUseCase } = makeSut()
      jest.spyOn(checkBusinessRuleUseCase, 'check').mockResolvedValue(undefined)
      const { body, headers, params, queryParams } = request
      const response = await sut.handle(request)
      expect(response).toEqual(HttpHelper.ok(body, headers, queryParams, params))
    })
  })
})
