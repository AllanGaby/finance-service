import { CreateEntityRepository } from '@/protocols/repositories'
import { EntityModel, CreateEntityDTO } from '@/domain/common'

export class CreateEntityRepositorySpy<EntityType extends EntityModel = EntityModel> implements CreateEntityRepository<EntityType> {
  params: CreateEntityDTO<EntityType>
  entity: EntityType

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
