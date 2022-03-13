import { EntityModel } from '@/domain/common'
import { GetEntityByIdRepository } from '@/protocols/repositories'
import { random } from 'faker'

export class GetEntityByIdRepositorySpy<EntityType extends EntityModel> implements GetEntityByIdRepository<EntityType> {
  entityId: string
  entity: EntityType = random.objectElement<EntityType>()

  async getById (entityId: string): Promise<EntityType> {
    this.entityId = entityId
    return this.entity
  }
}
