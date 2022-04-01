import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RecoverPasswordControllerProps, makeRecoverPasswordController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { DecryptRequestMiddlewareProps, makeDecryptRequestMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type RecoverPasswordRouteProps =
RecoverPasswordControllerProps &
DecryptRequestMiddlewareProps

export const makeRecoverPasswordRoute = (
  props: RecoverPasswordRouteProps,
  fieldsValidation: FieldValidationModel[]
): Router =>
  Router()
    .patch('/',
      ExpressMiddlewareAdapter(makeDecryptRequestMiddleware(props, 'token')),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeRecoverPasswordController(props)))
