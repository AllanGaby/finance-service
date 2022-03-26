import { EntityModel } from '@/domain/common'
import {
  CreateEntityWithAuthenticationRouteProps,
  makeCreateEntityWithAuthenticationRoute,
  UpdateEntityByIdWithAuthenticationRouteProps,
  makeUpdateEntityByIdWithAuthenticationRoute,
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  DefaultDeleteGetListEntityWithAuthenticationRoutesOptions,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type DefaultCRUDEntityWithAuthenticationRoutesProps =
DefaultDeleteGetListEntityWithAuthenticationRoutesProps &
CreateEntityWithAuthenticationRouteProps &
UpdateEntityByIdWithAuthenticationRouteProps

export type DefaultCRUDEntityWithAuthenticationRoutesOptions<EntityType extends EntityModel> =
DefaultDeleteGetListEntityWithAuthenticationRoutesOptions<EntityType> &
{
  createFieldsValidation?: FieldValidationModel[]
  updateFieldsValidation?: FieldValidationModel[]
  createAccessRules: string[]
  updateAccessRules: string[]
}

export const makeDefaultCRUDEntityWithAuthenticationRoutes = <EntityType extends EntityModel>(
  props: DefaultCRUDEntityWithAuthenticationRoutesProps,
  {
    createFieldsValidation,
    updateFieldsValidation,
    createAccessRules,
    updateAccessRules,
    ...options
  }: DefaultCRUDEntityWithAuthenticationRoutesOptions<EntityType>
): Router =>
    Router()
      .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, options))
      .use('/', makeCreateEntityWithAuthenticationRoute<EntityType>(props, options.entityClass, createFieldsValidation, createAccessRules))
      .use('/', makeUpdateEntityByIdWithAuthenticationRoute<EntityType>(props, options.entityClass, options.paramIdName, options.entityName, updateFieldsValidation, updateAccessRules))
