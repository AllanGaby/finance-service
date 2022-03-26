import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateAccessProfileControllerProps, makeCreateAccessProfileController } from '@/main/factories/authentication/controllers'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type CreateAccessProfileRouteProps =
RecoverAccessSessionMiddlewareProps &
CreateAccessProfileControllerProps

export const makeCreateAccessProfileRoute = (
  props: CreateAccessProfileRouteProps,
  fieldsValidation: FieldValidationModel[],
  createAccessRules: string[]
): Router =>
  Router()
    .post('/',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, createAccessRules)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeCreateAccessProfileController(props)))
