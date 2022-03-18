import { HttpMethod, HttpResponse, HttpStatusCode } from '@/protocols/http'
import { RequestValidatorModel } from '@/protocols/request-validator'
import { datatype, random } from 'faker'
import { SuperAgentTest } from 'supertest'

export class RouteHelpers {
  public static async GetHttpResponse (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    body: Object
  ): Promise<HttpResponse> {
    switch (method) {
      case HttpMethod.patch: {
        return agent
          .patch(url)
          .send(body)
      }
      case HttpMethod.put: {
        return agent
          .put(url)
          .send(body)
      }
      default: {
        return agent
          .post(url)
          .send(body)
      }
    }
  }

  public static async BodyRequiredValueValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    const bodyWithoutValue = {}
    Object.keys(body)
      .filter(key => key !== field)
      .forEach(key => {
        bodyWithoutValue[key] = body[key]
      })
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, bodyWithoutValue)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" is required` }
      ]
    })
  }

  public static async BodySmallerStringValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    minLength: number,
    body: Object
  ): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: 1, max: minLength - 1 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" length must be at least ${minLength} characters long` }
      ]
    })
  }

  public static async BodyBiggerStringValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    maxLength: number,
    body: Object
  ): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: maxLength + 1, max: maxLength + 100 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" length must be less than or equal to ${maxLength} characters long` }
      ]
    })
  }

  public static async BodyUuidValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    body[field] = datatype.number().toString()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" must be a valid GUID` }
      ]
    })
  }

  public static async BodyBooleanValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    body[field] = datatype.uuid()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" must be a boolean` }
      ]
    })
  }

  public static async BodyArrayValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    body[field] = datatype.uuid()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" must be an array` }
      ]
    })
  }

  public static async BodyArrayRequiredValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    body[field] = []
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    expect(response.body).toEqual({
      error: [
        { path: field, message: `"${field}" does not contain 1 required value(s)` }
      ]
    })
  }

  public static async BodyArrayUuidValidation (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    field: string,
    body: Object
  ): Promise<void> {
    body[field] = [
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString()
    ]
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, body)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    validations.forEach((error, index) => {
      if (index !== validations.length - 1) {
        expect(error).toEqual({
          message: `"${field}[${index}]" must be a valid GUID`,
          path: `${field},${index}`
        })
      } else {
        expect(error).toEqual({
          path: `${field}`,
          message: `"${field}" does not contain 1 required value(s)`
        })
      }
    })
  }
}
