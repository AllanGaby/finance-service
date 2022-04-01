import { VersionedEntityModel } from '@/domain/common'
import { UpdateEntityByIdController } from '@/presentation/common'
import { UpdateVersionedEntityByIdUseCaseProps, makeUpdateVersionedEntityByIdUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type UpdateVersionedEntityByIdControllerProps = UpdateVersionedEntityByIdUseCaseProps & {
  paramIdName: string
}

export const makeUpdateVersionedEntityByIdController = <EntityType extends VersionedEntityModel>(
  props: UpdateVersionedEntityByIdControllerProps,
  entityClass: EntityTarget<EntityType>
): UpdateEntityByIdController<EntityType> =>
    new UpdateEntityByIdController(
      makeUpdateVersionedEntityByIdUseCase<EntityType>(props, entityClass),
      props.paramIdName
    )
