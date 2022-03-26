import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteAccessSessionControllerProps, makeDeleteAccessSessionController } from '@/main/factories/authentication/controllers'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { Router } from 'express'

export type DeleteAccessSessionRouteProps =
DeleteAccessSessionControllerProps &
RecoverAccessSessionMiddlewareProps

export const makeDeleteAccessSessionRoute = (
  props: DeleteAccessSessionRouteProps
): Router =>
  Router()
    .delete('/',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props)),
      ExpressControllerAdapter(makeDeleteAccessSessionController(props)))
