import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateAccountByIdControllerProps, makeUpdateAccountByIdController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware, makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import {
  RecoverAccessSessionMiddlewareProps,
  makeRecoverAccessSessionMiddleware
} from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type UpdateAccountByIdRouteProps =
UpdateAccountByIdControllerProps &
RecoverAccessSessionMiddlewareProps

export const makeUpdateAccountByIdRoute = (
  props: UpdateAccountByIdRouteProps,
  fieldsValidation: FieldValidationModel[],
  paramIdName: string,
  updateAccessRules: string[]
): Router =>
  Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateAccountByIdController(props)))
