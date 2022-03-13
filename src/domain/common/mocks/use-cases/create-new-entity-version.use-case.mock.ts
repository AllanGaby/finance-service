import { UpdateEntityDTO, VersionedEntityModel, CreateNewEntityVersionUseCase } from '@/domain/common'

export class CreateNewEntityVersionUseCaseSpy<EntityType extends VersionedEntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements CreateNewEntityVersionUseCase<EntityType, UpdateEntityDTOType> {
  entityId: string
  params: UpdateEntityDTOType
  entity: EntityType

  async createVersion (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    this.entityId = entityId
    this.params = params
    return this.entity
  }
}
