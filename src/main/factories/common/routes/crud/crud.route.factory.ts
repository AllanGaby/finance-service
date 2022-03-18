import { EntityModel } from '@/domain/common'
import { CreateEntityRouteProps, makeCreateEntityRoute } from './create-entity.route'
import { DeleteEntityByIdRouteProps, makeDeleteEntityByIdRoute } from './delete-entity-by-id.route'
import { GetEntityByIdRouteProps, makeGetEntityByIdRoute } from './get-entity-by-id.route'
import { ListEntitiesRouteProps, makeListEntitiesRoute } from './list-entities.route'
import { UpdateEntityByIdRouteProps, makeUpdateEntityByIdRoute } from './update-entity-by-id.route'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type CRUDEntityRouteProps =
CreateEntityRouteProps &
DeleteEntityByIdRouteProps &
GetEntityByIdRouteProps &
UpdateEntityByIdRouteProps &
ListEntitiesRouteProps

export type CRUDEntityRouteOptions<EntityType extends EntityModel> = {
  entityClass: EntityTarget<EntityType>
  paramId: string
  entityName: string
  createFieldsValidation?: FieldValidationModel[]
  updateFieldsValidation?: FieldValidationModel[]
  validRequestColumns?: string[]
  validRepositoryColumns?: string[]
}

export const makeCrudEntityRoute = <EntityType extends EntityModel>(
  props: CRUDEntityRouteProps,
  {
    entityClass,
    entityName,
    paramId,
    createFieldsValidation,
    updateFieldsValidation
  }: CRUDEntityRouteOptions<EntityType>
): Router =>
    Router()
      .use('/', makeCreateEntityRoute<EntityType>(props, entityClass, createFieldsValidation))
      .use('/', makeDeleteEntityByIdRoute<EntityType>(props, entityClass, paramId))
      .use('/', makeGetEntityByIdRoute<EntityType>(props, entityClass, paramId, entityName))
      .use('/', makeListEntitiesRoute<EntityType>(props, entityClass))
      .use('/', makeUpdateEntityByIdRoute<EntityType>(props, entityClass, paramId, entityName, updateFieldsValidation))
