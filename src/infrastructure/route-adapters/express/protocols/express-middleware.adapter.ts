import { HttpStatusCode, MiddlewareProtocol, HttpRequest } from '@/protocols/http'
import { Request, Response, NextFunction } from 'express'

export const ExpressMiddlewareAdapter = (middleware: MiddlewareProtocol<any, any>) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const httpRequest: HttpRequest<any> = {
      headers: request.headers,
      body: request.body,
      params: request.params,
      queryParams: request.query
    }

    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === HttpStatusCode.ok) {
      request.body = httpResponse.body
      request.headers = httpResponse.headers
      request.params = httpResponse.params
      next()
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
