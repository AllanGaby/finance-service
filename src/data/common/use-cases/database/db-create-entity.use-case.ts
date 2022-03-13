import { EntityModel, CreateEntityUseCase, CreateEntityDTO } from '@/domain/common'
import { CreateEntityRepository } from '@/protocols/repositories'

export class DbCreateEntityUseCase<EntityType extends EntityModel, CreateEntityDTOType = CreateEntityDTO<EntityType>>
implements CreateEntityUseCase<EntityType, CreateEntityDTOType> {
  constructor (
    private readonly createEntityRepository: CreateEntityRepository<EntityType>
  ) {}

  async create (params: CreateEntityDTOType): Promise<EntityType> {
    return this.createEntityRepository.create(params as unknown as CreateEntityDTO<EntityType>)
  }
}
