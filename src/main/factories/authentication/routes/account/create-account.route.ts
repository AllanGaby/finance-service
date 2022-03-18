import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateAccountControllerProps, makeCreateAccountController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type CreateAccountRouteProps =
CreateAccountControllerProps

export const makeCreateAccountRoute = (
  props: CreateAccountRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .post('/',
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeCreateAccountController(props)))
