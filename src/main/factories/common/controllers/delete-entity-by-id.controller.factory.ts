import { EntityModel } from '@/domain/common'
import { DeleteEntityController } from '@/presentation/common'
import { DeleteEntityByIdUseCaseProps, makeDeleteEntityByIdUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdControllerProps = DeleteEntityByIdUseCaseProps & {
  paramIdName: string
}

export const makeDeleteEntityByIdController = <EntityType extends EntityModel>(
  props: DeleteEntityByIdControllerProps,
  entityClass: EntityTarget<EntityType>
): DeleteEntityController<EntityType> =>
    new DeleteEntityController(
      makeDeleteEntityByIdUseCase<EntityType>(props, entityClass),
      props.paramIdName
    )
