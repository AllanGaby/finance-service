import { EntityModel } from '@/domain/common'
import { GetEntityByIdController } from '@/presentation/common/controllers'
import { GetEntityByIdUseCaseProps, makeGetEntityByIdUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdControllerProps = GetEntityByIdUseCaseProps & {
  paramId: string
}

export const makeGetEntityByIdController = <EntityType extends EntityModel>(
  props: GetEntityByIdControllerProps,
  entityClass: EntityTarget<EntityType>
): GetEntityByIdController<EntityType> =>
    new GetEntityByIdController(
      makeGetEntityByIdUseCase<EntityType>(props, entityClass),
      props.paramId
    )
