import { EntityModel } from '@/domain/common'
import { UpdateEntityByIdController } from '@/presentation/common/controllers'
import { UpdateEntityByIdUseCaseProps, makeUpdateEntityByIdUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdControllerProps = UpdateEntityByIdUseCaseProps & {
  paramId: string
}

export const makeUpdateEntityByIdController = <EntityType extends EntityModel>(
  props: UpdateEntityByIdControllerProps,
  entityClass: EntityTarget<EntityType>
): UpdateEntityByIdController<EntityType> =>
    new UpdateEntityByIdController(
      makeUpdateEntityByIdUseCase<EntityType>(props, entityClass),
      props.paramId
    )
