import { UpdateEntityByIdUseCase, UpdateEntityDTO, EntityModel } from '@/domain/common'

export class UpdateEntityByIdUseCaseSpy<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements UpdateEntityByIdUseCase<EntityType, UpdateEntityDTOType> {
  entityId: string
  params: UpdateEntityDTOType
  updatedEntity: EntityType

  async updateById (entityId: string, params: UpdateEntityDTOType): Promise<EntityType> {
    this.entityId = entityId
    this.params = params
    return this.updatedEntity
  }
}
