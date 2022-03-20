import { ExpressControllerAdapter } from './express-controller.adapter'
import { ConditionalMissingParamError, EntityAlreadyExistsError, EntityIsNotFoundError, InvalidForeignKeyError, MissingParamError, ViolateUniqueKeyError } from '@/data/common/errors'
import { CorruptedAccountError, InvalidCredentialsError } from '@/data/authentication/errors'
import { mockPartialExpressRequest, mockPartialExpressResponse } from '@/infrastructure/route-adapters/express/mocks'
import { HttpStatusCode, ControllerSpy, mockHttpFailStatusCode, mockHttpSuccessStatusCode } from '@/protocols/http'
import { Request, Response } from 'express'
import { datatype, random } from 'faker'

type sutTypes = {
  controller: ControllerSpy
  request: Partial<Request>
  response: Partial<Response>
  sut: (request: Partial<Request>, response: Partial<Response>) => Promise<any>
}

const makeSut = (): sutTypes => {
  const controller = new ControllerSpy()
  return {
    controller,
    response: mockPartialExpressResponse(),
    request: mockPartialExpressRequest(),
    sut: ExpressControllerAdapter(controller)
  }
}

describe('ExpressControllerAdapter', () => {
  test('Should call controller with correct params', async () => {
    const { sut, controller, request, response } = makeSut()
    const handleSpy = jest.spyOn(controller, 'handle')
    await sut(request, response)
    expect(handleSpy).toHaveBeenCalledWith({
      body: request.body,
      params: request.params,
      headers: request.headers,
      queryParams: request.query
    })
  })

  describe('Request Succeeds', () => {
    test('Should return correct status code if Controller response between 200 and 299 status code', async () => {
      const { sut, controller, request, response } = makeSut()
      const statusSpy = jest.spyOn(response, 'status')
      const successStatusCode = mockHttpSuccessStatusCode()
      jest.spyOn(controller, 'handle').mockResolvedValue({
        statusCode: successStatusCode,
        body: undefined
      })
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(successStatusCode)
    })

    test('Should return correct body if Controller response between 200 and 299 status code', async () => {
      const { sut, controller, request, response } = makeSut()
      const jsonSpy = jest.spyOn(response, 'json')
      const body = random.objectElement()
      jest.spyOn(controller, 'handle').mockResolvedValue({
        statusCode: mockHttpSuccessStatusCode(),
        body
      })
      await sut(request, response)
      expect(jsonSpy).toHaveBeenCalledWith(body)
    })
  })

  describe('Request Fails', () => {
    test('Should return correct status code if Controller response status code bigger then 299', async () => {
      const { sut, controller, request, response } = makeSut()
      const statusSpy = jest.spyOn(response, 'status')
      const failsStatusCode = mockHttpFailStatusCode()
      jest.spyOn(controller, 'handle').mockResolvedValue({
        statusCode: failsStatusCode,
        body: undefined
      })
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(failsStatusCode)
    })

    test('Should return correct body if Controller response status code bigger then 299', async () => {
      const { sut, controller, request, response } = makeSut()
      const jsonSpy = jest.spyOn(response, 'json')
      const body = random.objectElement()
      jest.spyOn(controller, 'handle').mockResolvedValue({
        statusCode: mockHttpFailStatusCode(),
        body
      })
      await sut(request, response)
      expect(jsonSpy).toHaveBeenCalledWith({
        error: body
      })
    })
  })

  describe('Controller Throws', () => {
    test('Should return Forbidden Status Code (403) if controller return CorruptedAccountError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new CorruptedAccountError()
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.forbidden)
    })

    test('Should return Forbidden Status Code (403) if controller return InvalidCredentialsError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new InvalidCredentialsError()
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.forbidden)
    })

    test('Should return NotFound Status Code (404) if controller return EntityIsNotFoundError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new EntityIsNotFoundError(datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.notFound)
    })

    test('Should return Conflict Status Code (409) if controller return EntityAlreadyExistsError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new EntityAlreadyExistsError(datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.conflict)
    })

    test('Should return Conflict Status Code (409) if controller return InvalidForeignKeyError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new InvalidForeignKeyError(datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.conflict)
    })

    test('Should return Conflict Status Code (409) if controller return ViolateUniqueKeyError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new ViolateUniqueKeyError(datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.conflict)
    })

    test('Should return UnprocessableEntity Status Code (422) if controller return MissingParamError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new MissingParamError(datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.unprocessableEntity)
    })

    test('Should return UnprocessableEntity Status Code (422) if controller return ConditionalMissingParamError', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new ConditionalMissingParamError(datatype.uuid(), datatype.uuid())
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.unprocessableEntity)
    })

    test('Should return ServerError Status Code (500) if controller return any other error', async () => {
      const { sut, controller, request, response } = makeSut()
      const error = new Error()
      const statusSpy = jest.spyOn(response, 'status')
      jest.spyOn(controller, 'handle').mockRejectedValue(error)
      await sut(request, response)
      expect(statusSpy).toHaveBeenCalledWith(HttpStatusCode.serverError)
    })
  })
})
