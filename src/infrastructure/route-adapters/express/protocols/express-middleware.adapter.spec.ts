import { ExpressMiddlewareAdapter } from './express-middleware.adapter'
import { HttpStatusCode, MiddlewareSpy } from '@/protocols/http'
import { mockPartialExpressRequest, mockPartialExpressResponse } from '@/infrastructure/route-adapters/express/mocks'
import { NextFunction, Request, Response } from 'express'
import { datatype, random } from 'faker'

type sutTypes = {
  middleware: MiddlewareSpy
  request: Partial<Request>
  response: Partial<Response>
  next: NextFunction
  sut: (request: Partial<Request>, response: Partial<Response>, next: NextFunction) => Promise<any>
}

const makeSut = (): sutTypes => {
  const middleware = new MiddlewareSpy()
  return {
    middleware,
    response: mockPartialExpressResponse(),
    request: mockPartialExpressRequest(),
    next: jest.fn(),
    sut: ExpressMiddlewareAdapter(middleware)
  }
}

describe('ExpressMiddlewareAdapter', () => {
  test('Should call middleware with correct params', async () => {
    const { sut, middleware, request, response, next } = makeSut()
    const handleSpy = jest.spyOn(middleware, 'handle')
    const body = request.body
    await sut(request, response, next)
    expect(handleSpy).toHaveBeenCalledWith({
      body,
      headers: request.headers,
      params: request.params,
      queryParams: request.query
    })
  })

  describe('Request Succeeds', () => {
    test('Should call next function if middleware return Ok Status Code(200)', async () => {
      const { sut, middleware, request, response, ...props } = makeSut()
      const nextSpy = jest.spyOn(props, 'next')
      jest.spyOn(middleware, 'handle').mockResolvedValue({
        statusCode: HttpStatusCode.ok,
        body: undefined
      })
      await sut(request, response, props.next)
      expect(nextSpy).toHaveBeenCalled()
    })

    test('Should change request body if middleware return Ok Status Code(200)', async () => {
      const { sut, middleware, request, response, ...props } = makeSut()
      delete request.body
      const body = random.objectElement()
      jest.spyOn(middleware, 'handle').mockResolvedValue({
        statusCode: HttpStatusCode.ok,
        body
      })
      await sut(request, response, props.next)
      expect(request.body).toEqual(body)
    })
  })

  describe('Request Fails', () => {
    test('Should not call next function if middleware return status code different of Ok(200)', async () => {
      const { sut, middleware, request, response, ...props } = makeSut()
      const nextSpy = jest.spyOn(props, 'next')
      jest.spyOn(middleware, 'handle').mockResolvedValue({
        statusCode: datatype.number({ min: 201 }),
        body: undefined
      })
      await sut(request, response, props.next)
      expect(nextSpy).not.toHaveBeenCalled()
    })

    test('Should return correct status code if middleware return status code bigger then 299', async () => {
      const { sut, middleware, request, response, next } = makeSut()
      const statusSpy = jest.spyOn(response, 'status')
      const failsStatusCode = datatype.number({ min: 201 })
      jest.spyOn(middleware, 'handle').mockResolvedValue({
        statusCode: failsStatusCode,
        body: undefined
      })
      await sut(request, response, next)
      expect(statusSpy).toHaveBeenCalledWith(failsStatusCode)
    })

    test('Should return correct body if middleware return status code bigger then 299', async () => {
      const { sut, middleware, request, response, next } = makeSut()
      const jsonSpy = jest.spyOn(response, 'json')
      const body = random.objectElement()
      jest.spyOn(middleware, 'handle').mockResolvedValue({
        statusCode: datatype.number({ min: 201 }),
        body
      })
      await sut(request, response, next)
      expect(jsonSpy).toHaveBeenCalledWith({
        error: body
      })
    })
  })
})
