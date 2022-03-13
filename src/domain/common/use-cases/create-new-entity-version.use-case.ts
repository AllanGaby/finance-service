import { UpdateEntityDTO, VersionedEntityModel } from '@/domain/common'

export interface CreateNewEntityVersionUseCase<EntityType extends VersionedEntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>> {
  createVersion: (entityId: string, params: UpdateEntityDTOType) => Promise<EntityType>
}
