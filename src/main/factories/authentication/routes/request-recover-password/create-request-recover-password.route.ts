import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateRequestRecoverPasswordControllerProps, makeCreateRequestRecoverPasswordController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware, SetSettingsHeaderMiddlewareProps, makeSetSettingsHeaderMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type CreateRequestRecoverPasswordRouteProps =
CreateRequestRecoverPasswordControllerProps &
SetSettingsHeaderMiddlewareProps

export const makeCreateRequestRecoverPasswordRoute = (
  props: CreateRequestRecoverPasswordRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .post('/',
      ExpressMiddlewareAdapter(makeSetSettingsHeaderMiddleware(props)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeCreateRequestRecoverPasswordController(props)))
