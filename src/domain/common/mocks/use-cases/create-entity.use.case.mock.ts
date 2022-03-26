import { CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'

export class CreateEntityUseCaseSpy<EntityType, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements CreateEntityUseCase<EntityType, CreateEntityDTOType> {
  params: CreateEntityDTOType
  entity: EntityType

  async create (params: CreateEntityDTOType): Promise<EntityType | EntityType[]> {
    this.params = params
    return this.entity
  }
}
