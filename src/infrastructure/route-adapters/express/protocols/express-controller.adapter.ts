import {
  ConditionalMissingParamError,
  EntityAlreadyExistsError,
  EntityIsNotFoundError,
  InvalidForeignKeyError,
  MissingParamError,
  ViolateUniqueKeyError,
  InvalidColumnsError
} from '@/data/common/errors'
import { HttpStatusCode, ControllerProtocol, HttpRequest } from '@/protocols/http'
import { UnauthorizedError, CorruptedAccountError, InvalidCredentialsError } from '@/data/authentication/errors'
import { Request, Response } from 'express'

export const ExpressControllerAdapter = <RequestBody = any, ResponseBody = any>(controller: ControllerProtocol<RequestBody, ResponseBody | Error>) =>
  async (request: Partial<Request>, response: Partial<Response>) => {
    const httpRequest: HttpRequest<RequestBody> = {
      ip: request.ip,
      body: request.body,
      params: request.params,
      headers: request.headers,
      queryParams: request.query,
      user: request.user
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
      } else if (httpResponse.file) {
        const file = Buffer.from(httpResponse.file.fileContent)
        response.contentType(httpResponse.file.contentType)
        response.end(file)
      } else {
        response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
      }
      return response
    } catch (error) {
      switch (error.constructor) {
        case InvalidColumnsError:
          return SetErrorResponse(HttpStatusCode.badRequest, error)
        case UnauthorizedError:
          return SetErrorResponse(HttpStatusCode.unauthorized, error)
        case CorruptedAccountError:
          return SetErrorResponse(HttpStatusCode.forbidden, error)
        case InvalidCredentialsError:
          return SetErrorResponse(HttpStatusCode.forbidden, error)
        case EntityIsNotFoundError:
          return SetErrorResponse(HttpStatusCode.notFound, error)
        case MissingParamError:
          return SetErrorResponse(HttpStatusCode.unprocessableEntity, error)
        case ConditionalMissingParamError:
          return SetErrorResponse(HttpStatusCode.unprocessableEntity, error)
        case EntityAlreadyExistsError:
          return SetErrorResponse(HttpStatusCode.conflict, error)
        case InvalidForeignKeyError:
          return SetErrorResponse(HttpStatusCode.conflict, error)
        case ViolateUniqueKeyError:
          return SetErrorResponse(HttpStatusCode.conflict, error)
        default:
          return SetErrorResponse(HttpStatusCode.serverError, error)
      }
    }
  }
