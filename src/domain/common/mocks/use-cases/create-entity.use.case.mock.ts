import { CreateEntityUseCase, CreateEntityDTO, EntityModel } from '@/domain/common'

export class CreateEntityUseCaseSpy<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements CreateEntityUseCase<EntityType, CreateEntityDTOType> {
  params: CreateEntityDTOType
  entity: EntityType

  async create (params: CreateEntityDTOType): Promise<EntityType | EntityType[]> {
    this.params = params
    return this.entity
  }
}
