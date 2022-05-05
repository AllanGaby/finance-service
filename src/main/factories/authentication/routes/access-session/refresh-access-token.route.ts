import { FieldValidationModel } from '@/protocols/request-validator'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RefreshAccessTokenControllerProps, makeRefreshAccessTokenController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'

export type RefreshAccessTokenRouteProps =
RefreshAccessTokenControllerProps

export const makeRefreshAccessTokenRoute = (
  props: RefreshAccessTokenRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .put('/',
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeRefreshAccessTokenController(props)))
