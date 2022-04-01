import { UpdateEntityDTO, UpdateEntityByIdUseCase, VersionedEntityModel } from '@/domain/common'
import { DbUpdateVersionedEntityByIdUseCase } from '@/data/common/use-cases'
import { CreateNewEntityVersionUseCaseProps, makeCreateNewEntityVersionUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type UpdateVersionedEntityByIdUseCaseProps = CreateNewEntityVersionUseCaseProps

export const makeUpdateVersionedEntityByIdUseCase = <EntityType extends VersionedEntityModel, DTOType = UpdateEntityDTO<EntityType>>(
  props: UpdateVersionedEntityByIdUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  UpdateEntityByIdUseCase<EntityType, DTOType> =>
    new DbUpdateVersionedEntityByIdUseCase<EntityType, DTOType>(
      makeCreateNewEntityVersionUseCase(props, entityClass)
    )
