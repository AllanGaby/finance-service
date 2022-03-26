import { CreateAccessSessionRouteProps, makeCreateAccessSessionRoute } from './create-access-session.route'
import { DeleteAccessSessionRouteProps, makeDeleteAccessSessionRoute } from './delete-access-session.route'
import {
  makeCreateAccessSessionFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { Router } from 'express'

export type AccessSessionRouteProps =
CreateAccessSessionRouteProps &
DeleteAccessSessionRouteProps

export const makeAccessSessionRoute = (
  props: AccessSessionRouteProps
): Router =>
  Router()
    .use('/', makeCreateAccessSessionRoute(props, makeCreateAccessSessionFieldsValidations()))
    .use('/', makeDeleteAccessSessionRoute(props))
