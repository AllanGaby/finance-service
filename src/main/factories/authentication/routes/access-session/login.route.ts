import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { LoginControllerProps, makeLoginController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { DecryptRequestMiddlewareProps, makeDecryptRequestMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type LoginRouteProps =
LoginControllerProps &
DecryptRequestMiddlewareProps

export const makeLoginRoute = (
  props: LoginRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .post('/',
      ExpressMiddlewareAdapter(makeDecryptRequestMiddleware(props, 'token')),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeLoginController(props)))
