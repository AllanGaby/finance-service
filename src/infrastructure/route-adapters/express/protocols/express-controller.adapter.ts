import {
  ConditionalMissingParamError,
  EntityAlreadyExistsError,
  EntityIsNotFoundError,
  InvalidForeignKeyError,
  MissingParamError,
  ViolateUniqueKeyError
} from '@/data/common/errors'
import { HttpStatusCode, ControllerProtocol, HttpRequest } from '@/protocols/http'
import { CorruptedAccountError, InvalidCredentialsError } from '@/data/authentication/errors'
import { Request, Response } from 'express'

export const ExpressControllerAdapter = <RequestBody = any, ResponseBody = any>(controller: ControllerProtocol<RequestBody, ResponseBody | Error>) =>
  async (request: Partial<Request>, response: Partial<Response>) => {
    const httpRequest: HttpRequest<RequestBody> = {
      body: request.body,
      params: request.params,
      headers: request.headers,
      queryParams: request.query
    }

    const SetErrorResponse = (statusCode: number, error: any): Partial<Response> => {
      response.status(statusCode).json({
        error
      })
      return response
    }

    try {
      const httpResponse = await controller.handle(httpRequest)
      if (httpResponse.statusCode >= 300) {
        return SetErrorResponse(httpResponse.statusCode, httpResponse.body)
      }
      response
        .status(httpResponse.statusCode)
        .json(httpResponse.body)
      return response
    } catch (error) {
      if (error instanceof CorruptedAccountError) {
        return SetErrorResponse(HttpStatusCode.forbidden, error)
      }
      if (error instanceof InvalidCredentialsError) {
        return SetErrorResponse(HttpStatusCode.forbidden, error)
      }
      if (error instanceof EntityIsNotFoundError) {
        return SetErrorResponse(HttpStatusCode.notFound, error)
      }
      if (error instanceof MissingParamError) {
        return SetErrorResponse(HttpStatusCode.unprocessableEntity, error)
      }
      if (error instanceof ConditionalMissingParamError) {
        return SetErrorResponse(HttpStatusCode.unprocessableEntity, error)
      }
      if (error instanceof EntityAlreadyExistsError) {
        return SetErrorResponse(HttpStatusCode.conflict, error)
      }
      if (error instanceof InvalidForeignKeyError) {
        return SetErrorResponse(HttpStatusCode.conflict, error)
      }
      if (error instanceof ViolateUniqueKeyError) {
        return SetErrorResponse(HttpStatusCode.conflict, error)
      }
      return SetErrorResponse(HttpStatusCode.serverError, error)
    }
  }
