import { EntityModel } from '@/domain/common'
import { GetEntityByIdController } from '@/presentation/common'
import { GetEntityByIdUseCaseProps, makeGetEntityByIdUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdControllerProps = GetEntityByIdUseCaseProps & {
  paramName: string
}

export const makeGetEntityByIdController = <EntityType extends EntityModel>(
  props: GetEntityByIdControllerProps,
  entityClass: EntityTarget<EntityType>
): GetEntityByIdController<EntityType> =>
    new GetEntityByIdController(
      makeGetEntityByIdUseCase<EntityType>(props, entityClass),
      props.paramName
    )
