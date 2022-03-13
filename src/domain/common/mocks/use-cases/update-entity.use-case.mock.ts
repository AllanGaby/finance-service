import { UpdateEntityUseCase, UpdateEntityDTO, EntityModel } from '@/domain/common'

export class UpdateEntityUseCaseSpy<EntityType extends EntityModel, UpdateEntityDTOType = UpdateEntityDTO<EntityType>>
implements UpdateEntityUseCase<EntityType, UpdateEntityDTOType> {
  params: UpdateEntityDTOType
  updatedEntity: EntityType

  async update (params: UpdateEntityDTOType): Promise<EntityType | EntityType[]> {
    this.params = params
    return this.updatedEntity
  }
}
