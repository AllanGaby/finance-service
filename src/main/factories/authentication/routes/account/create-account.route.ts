import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateAccountControllerProps, makeCreateAccountController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { DecryptRequestMiddlewareProps, makeDecryptRequestMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type CreateAccountRouteProps =
CreateAccountControllerProps &
DecryptRequestMiddlewareProps

export const makeCreateAccountRoute = (
  props: CreateAccountRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .post('/',
      ExpressMiddlewareAdapter(makeDecryptRequestMiddleware(props, 'token')),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeCreateAccountController(props)))
