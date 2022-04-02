import { AccessTokenPayloadModel, mockAccessSessionModel } from '@/domain/authentication'
import { HttpMethod, HttpResponse, HttpStatusCode } from '@/protocols/http'
import { RequestValidatorModel } from '@/protocols/request-validator'
import { CreatePublicEncryptedToken, EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import { RSAFactory } from '@/infrastructure/rsa'
import { MemoryCacheAdapter } from '@/infrastructure/cache/memory'
import { JWTFactory } from '@/infrastructure/jwt'
import {
  BiggerValidationRouteHelperDTO,
  CommonRouteHelperDTO,
  GetResponseRouteHelperDTO,
  InvalidTypeValidationRouteHelperDTO,
  PasswordConfirmationValidationRouteHelperDTO,
  SmallerValidationRouteHelperDTO
} from '@/main/factories/common/helpers'
import { ConfigSetup } from '@/main/application/config'
import { database, datatype, internet, random } from 'faker'

export class RouteHelpers {
  public static async GetAccessToken (accessRuleKeys: string[] = [], accountId: string = undefined): Promise<string> {
    const config = ConfigSetup()
    const accessSession = mockAccessSessionModel()
    if (accountId) {
      accessSession.account_id = accountId
    }
    const moduleKeys = Object.keys(accessSession.modules)
    accessSession.modules[moduleKeys[0]].access_profile_rules.push(...accessRuleKeys)
    const accessSessionId = datatype.uuid()
    const createRSAToken = RSAFactory.getRSAAdapter<EncryptRequestWithPublicKeyProtocol>({
      privateKey: await config.security.getPrivateKey(),
      publicKey: await config.security.getPublicKey()
    })
    MemoryCacheAdapter.getInstance().records = {
      [`session:${accessSession.account_id}:${accessSessionId}`]: JSON.stringify(accessSession)
    }
    const acessSessionTokenPayload: AccessTokenPayloadModel = {
      account_id: accessSession.account_id,
      session_id: accessSessionId
    }
    const accessToken = createRSAToken.createToken(JSON.stringify(acessSessionTokenPayload))
    return JWTFactory.GetJWTAdapter(config.security.jwtSecret).createJWT({
      payload: {
        access_token: accessToken
      },
      subject: accessSession.account_id
    }, '24h')
  }

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

  public static async GetHttpResponse ({
    agent,
    url,
    method,
    body = undefined,
    accessToken = '',
    accessTokenName = database.column()
  }: GetResponseRouteHelperDTO
  ): Promise<HttpResponse> {
    switch (method) {
      case HttpMethod.delete: {
        return agent
          .delete(url)
          .set(accessTokenName, accessToken)
          .send(body)
      }
      case HttpMethod.patch: {
        return agent
          .patch(url)
          .set(accessTokenName, accessToken)
          .send(body)
      }
      case HttpMethod.put: {
        return agent
          .put(url)
          .set(accessTokenName, accessToken)
          .send(body)
      }
      default: {
        return agent
          .post(url)
          .set(accessTokenName, accessToken)
          .send(body)
      }
    }
  }

  public static async BodyRequiredValueValidation ({
    field,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: CommonRouteHelperDTO): Promise<void> {
    const bodyWithoutValue = {}
    Object.keys(body)
      .filter(key => key !== field)
      .forEach(key => {
        bodyWithoutValue[key] = body[key]
      })
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({
      body: RouteHelpers.GetBody(bodyWithoutValue, cryptography, tokenField, publicKey),
      ...props
    })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" is required` }
    )
  }

  public static async BodySmallerStringValidation ({
    field,
    minLength,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: SmallerValidationRouteHelperDTO): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: 1, max: minLength - 1 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" length must be at least ${minLength} characters long` }
    )
  }

  public static async BodyBiggerStringValidation ({
    field,
    maxLength,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: BiggerValidationRouteHelperDTO): Promise<void> {
    body[field] = random.alphaNumeric(datatype.number({ min: maxLength + 1, max: maxLength + 100 }))
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" length must be less than or equal to ${maxLength} characters long` }
    )
  }

  public static async BodyInvalidTypeValidation ({
    field,
    body,
    invalidValue,
    type,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: InvalidTypeValidationRouteHelperDTO): Promise<void> {
    body[field] = invalidValue
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be a ${type}` }
    )
  }

  public static async BodyNumberValidation (props: CommonRouteHelperDTO): Promise<void> {
    await RouteHelpers.BodyInvalidTypeValidation({
      ...props,
      invalidValue: datatype.string(),
      type: 'number'
    })
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
    field,
    sameTo,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: PasswordConfirmationValidationRouteHelperDTO): Promise<void> {
    body[field] = internet.password()
    body[sameTo] = internet.password()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be [ref:${sameTo}]` }
    )
  }

  public static async BodyArrayValidation ({
    field,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = datatype.uuid()
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be an array` }
    )
  }

  public static async BodyArrayRequiredValidation ({
    field,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = []
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" does not contain 1 required value(s)` }
    )
  }

  public static async BodyArrayUuidValidation ({
    field,
    body,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: CommonRouteHelperDTO): Promise<void> {
    body[field] = [
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString(),
      datatype.number().toString()
    ]
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ body: RouteHelpers.GetBody(body, cryptography, tokenField, publicKey), ...props })
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
    url,
    field,
    cryptography,
    tokenField,
    publicKey,
    ...props
  }: CommonRouteHelperDTO): Promise<void> {
    url = `${url}/${datatype.number()}`
    const response: HttpResponse = await RouteHelpers.GetHttpResponse({ ...props, url })
    expect(response.statusCode).toEqual(HttpStatusCode.unprocessableEntity)
    const validations = response.body.error as RequestValidatorModel[]
    expect(validations).toContainEqual(
      { path: field, message: `"${field}" must be a valid GUID` }
    )
  }
}
