import { EntityModel } from '@/domain/common'
import {
  CreateEntityRouteProps,
  makeCreateEntityRoute,
  UpdateEntityByIdRouteProps,
  makeUpdateEntityByIdRoute,
  DefaultDeleteGetListEntityRoutesOptions,
  DefaultDeleteGetListEntityRoutesProps,
  makeDefaultDeleteGetListEntityRoutes
} from '@/main/factories/common/routes'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'

export type DefaultCRUDEntityRoutesProps =
DefaultDeleteGetListEntityRoutesProps &
CreateEntityRouteProps &
UpdateEntityByIdRouteProps

export type DefaultCRUDEntityRoutesOptions<EntityType extends EntityModel> = DefaultDeleteGetListEntityRoutesOptions<EntityType> & {
  createFieldsValidation?: FieldValidationModel[]
  updateFieldsValidation?: FieldValidationModel[]
}

export const makeDefaultCRUDEntityRoutes = <EntityType extends EntityModel>(
  props: DefaultCRUDEntityRoutesProps,
  {
    entityClass,
    entityName,
    paramIdName,
    createFieldsValidation,
    updateFieldsValidation
  }: DefaultCRUDEntityRoutesOptions<EntityType>
): Router =>
    Router()
      .use('/', makeCreateEntityRoute<EntityType>(props, entityClass, createFieldsValidation))
      .use(makeDefaultDeleteGetListEntityRoutes(props, { entityClass, paramIdName, entityName }))
      .use('/', makeUpdateEntityByIdRoute<EntityType>(props, entityClass, paramIdName, entityName, updateFieldsValidation))
