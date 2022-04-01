import { CreateRequestRecoverPasswordRouteProps, makeCreateRequestRecoverPasswordRoute } from './create-request-recover-password.route'
import { RecoverPasswordRouteProps, makeRecoverPasswordRoute } from './recover-password.route'
import {
  makeCreateRequestRecoverPasswordFieldsValidations,
  makeRecoverPasswordFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { RequestRecoverPasswordRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type RequestRecoverPasswordRouteProps =
CreateRequestRecoverPasswordRouteProps &
RecoverPasswordRouteProps

export const makeRequestRecoverPasswordRoute = (
  props: RequestRecoverPasswordRouteProps
): Router => {
  props.repositorySettings = RequestRecoverPasswordRepositorySettings
  return Router()
    .use('/', makeCreateRequestRecoverPasswordRoute(props, makeCreateRequestRecoverPasswordFieldsValidations()))
    .use('/', makeRecoverPasswordRoute(props, makeRecoverPasswordFieldsValidations()))
}
