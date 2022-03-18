import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateAccessProfileByIdControllerProps, makeUpdateAccessProfileByIdController } from '@/main/factories/authentication/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type UpdateAccessProfileByIdRouteProps =
Omit<UpdateAccessProfileByIdControllerProps, 'paramName'>

export const makeUpdateAccessProfileByIdRoute = (
  props: UpdateAccessProfileByIdRouteProps,
  paramName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[]
): Router => Router()
  .put(`/:${paramName}`,
    ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramName)),
    ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
    ExpressControllerAdapter(makeUpdateAccessProfileByIdController({
      ...props,
      paramName
    })))
