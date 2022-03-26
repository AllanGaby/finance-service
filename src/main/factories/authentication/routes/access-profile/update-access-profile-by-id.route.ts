import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateAccessProfileByIdControllerProps, makeUpdateAccessProfileByIdController } from '@/main/factories/authentication/controllers'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type UpdateAccessProfileByIdRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<UpdateAccessProfileByIdControllerProps, 'paramIdName'>

export const makeUpdateAccessProfileByIdRoute = (
  props: UpdateAccessProfileByIdRouteProps,
  paramIdName: string,
  fieldsValidation: FieldValidationModel[],
  updateAccessRules: string[]
): Router => Router()
  .put(`/:${paramIdName}`,
    ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
    ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
    ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
    ExpressControllerAdapter(makeUpdateAccessProfileByIdController({
      ...props,
      paramIdName
    })))
