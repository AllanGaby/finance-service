import { HttpMethod, HttpResponse, HttpStatusCode } from '@/protocols/http'
import { RequestValidatorModel } from '@/protocols/request-validator'
import { CreatePublicEncryptedToken } from '@/protocols/rsa'
import {
  BiggerValidationRouteHelperDTO,
  CommonRouteHelperDTO,
  InvalidTypeValidationRouteHelperDTO,
  PasswordConfirmationValidationRouteHelperDTO,
  SmallerValidationRouteHelperDTO
} from '@/main/factories/common/helpers'
import { datatype, internet, random } from 'faker'
import { SuperAgentTest } from 'supertest'

export class RouteHelpers {
  public static GetBody (
    currentBody: Object,
    cryptography: boolean = false,
    tokenField: string = 'token',
    publicKey: string = ''
  ): Object {
    if (!cryptography) {
      return currentBody
    }
    return {
      [tokenField]: CreatePublicEncryptedToken(publicKey, currentBody)
    }
  }

  public static async GetHttpResponse (
    agent: SuperAgentTest,
    url: string,
    method: HttpMethod,
    body?: Object
  ): Promise<HttpResponse> {
    switch (method) {
      case HttpMethod.delete: {
        return agent
          .delete(url)
          .send(body)
      }
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

  public static async BodyRequiredValueValidation ({
    agent,
    url,
    method,
    field,
    body,
    cryptography,
    tokenField,
    publicKey
  }: CommonRouteHelperDTO): Promise<void> {
    const bodyWithoutValue = {}
    Object.keys(body)
      .filter(key => key !== field)
      .forEach(key => {
        bodyWithoutValue[key] = body[key]
      })
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(bodyWithoutValue, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" is required` }
    )
  }

  public static async BodySmallerStringValidation ({
    agent,
    url,
    method,
    field,
    minLength,
    body,
    cryptography,
    tokenField,
    publicKey
  }: SmallerValidationRouteHelperDTO): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: 1, max: minLength - 1 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" length must be at least ${minLength} characters long` }
    )
  }

  public static async BodyBiggerStringValidation ({
    agent,
    url,
    method,
    field,
    maxLength,
    body,
    cryptography,
    tokenField,
    publicKey
  }: BiggerValidationRouteHelperDTO): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: maxLength + 1, max: maxLength + 100 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" length must be less than or equal to ${maxLength} characters long` }
    )
  }

  public static async BodyInvalidTypeValidation ({
    agent,
    url,
    method,
    field,
    body,
    invalidValue,
    type,
    cryptography,
    tokenField,
    publicKey
  }: InvalidTypeValidationRouteHelperDTO): Promise<void> {
    body[field] = invalidValue
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be a ${type}` }
    )
  }

  public static async BodyEmailValidation (props: CommonRouteHelperDTO): Promise<void> {
    await RouteHelpers.BodyInvalidTypeValidation({
      ...props,
      invalidValue: datatype.number().toString(),
      type: 'valid email'
    })
  }

  public static async BodyUuidValidation (props: CommonRouteHelperDTO): Promise<void> {
    await RouteHelpers.BodyInvalidTypeValidation({
      ...props,
      invalidValue: datatype.number().toString(),
      type: 'valid GUID'
    })
  }

  public static async BodyBooleanValidation (props: CommonRouteHelperDTO): Promise<void> {
    await RouteHelpers.BodyInvalidTypeValidation({
      ...props,
      invalidValue: datatype.number().toString(),
      type: 'boolean'
    })
  }

  public static async BodyStringValidation (props: CommonRouteHelperDTO): Promise<void> {
    await RouteHelpers.BodyInvalidTypeValidation({
      ...props,
      invalidValue: datatype.number(),
      type: 'string'
    })
  }

  public static async BodyPasswordConfirmationValidation ({
    agent,
    url,
    method,
    field,
    sameTo,
    body,
    cryptography,
    tokenField,
    publicKey
  }: PasswordConfirmationValidationRouteHelperDTO): Promise<void> {
    body[field] = internet.password()
    body[sameTo] = internet.password()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be [ref:${sameTo}]` }
    )
  }

  public static async BodyArrayValidation ({
    agent,
    url,
    method,
    field,
    body,
    cryptography,
    tokenField,
    publicKey
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = datatype.uuid()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be an array` }
    )
  }

  public static async BodyArrayRequiredValidation ({
    agent,
    url,
    method,
    field,
    body,
    cryptography,
    tokenField,
    publicKey
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = []
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" does not contain 1 required value(s)` }
    )
  }

  public static async BodyArrayUuidValidation ({
    agent,
    url,
    method,
    field,
    body,
    cryptography,
    tokenField,
    publicKey
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = [
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString()
    ]
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method, RouteHelpers.GetBody(body, cryptography, tokenField, publicKey))
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

  public static async URLParamUuidValidation ({
    agent,
    url,
    method,
    field,
    cryptography,
    tokenField,
    publicKey
  }: CommonRouteHelperDTO): Promise<void> {
    url = `${url}/${datatype.number()}`
    const response: HttpResponse = await RouteHelpers.GetHttpResponse(agent, url, method)
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be a valid GUID` }
    )
  }
}
