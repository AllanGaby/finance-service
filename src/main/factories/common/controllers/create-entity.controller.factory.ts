import { EntityModel } from '@/domain/common'
import { CreateEntityController } from '@/presentation/common'
import { CreateEntityUseCaseProps, makeCreateEntityUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type CreateEntityControllerProps = CreateEntityUseCaseProps

export const makeCreateEntityController = <EntityType extends EntityModel>(
  props: CreateEntityControllerProps,
  entityClass: EntityTarget<EntityType>
): CreateEntityController<EntityType> =>
    new CreateEntityController(
      makeCreateEntityUseCase<EntityType>(props, entityClass)
    )
