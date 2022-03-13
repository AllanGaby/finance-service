import { UpdateEntityRepository } from '@/protocols/repositories'
import { EntityModel } from '@/domain/common'

export class UpdateEntityRepositorySpy<EntityType extends EntityModel> implements UpdateEntityRepository<EntityType> {
  params: Partial<EntityType>
  entity: EntityType

  async update (params: Partial<EntityType>): Promise<EntityType> {
    this.params = params
    return this.entity
  }
}
