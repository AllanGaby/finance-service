import { HttpStatusCode, HttpResponse } from '@/protocols/http'

export class HttpHelper {
  static ok<BodyType, HeadersType = any>(data: BodyType, headers: HeadersType = undefined): HttpResponse<BodyType, HeadersType> {
    return {
      statusCode: HttpStatusCode.ok,
      body: data,
      headers
    }
  }

  static created<BodyType>(data: BodyType): HttpResponse<BodyType> {
    return {
      statusCode: HttpStatusCode.created,
      body: data
    }
  }

  static noContent (): HttpResponse<undefined> {
    return {
      statusCode: HttpStatusCode.noContent,
      body: undefined
    }
  }

  static badRequest (error: Error): HttpResponse<Error> {
    return {
      body: error,
      statusCode: HttpStatusCode.badRequest
    }
  }

  static unauthorized (error: Error): HttpResponse<Error> {
    return {
      body: error,
      statusCode: HttpStatusCode.unauthorized
    }
  }

  static forbidden (error: Error): HttpResponse<Error> {
    return {
      statusCode: HttpStatusCode.forbidden,
      body: error
    }
  }

  static notFound <BodyType = undefined>(data?: BodyType): HttpResponse<BodyType> {
    return {
      statusCode: HttpStatusCode.notFound,
      body: data
    }
  }

  static conflict (error: Error): HttpResponse<Error> {
    return {
      statusCode: HttpStatusCode.conflict,
      body: error
    }
  }

  static unprocessableEntity (error: object): HttpResponse<object> {
    return {
      statusCode: HttpStatusCode.unprocessableEntity,
      body: error
    }
  }

  static serverError (error: Error): HttpResponse<Error> {
    return {
      statusCode: HttpStatusCode.serverError,
      body: error
    }
  }
}
