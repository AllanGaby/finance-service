import { EntityModel } from '@/domain/common'
import { SoftDeleteEntityByIdRepository } from '@/protocols/repositories'

export class SoftDeleteEntityByIdRepositorySpy<EntityType extends EntityModel> implements SoftDeleteEntityByIdRepository<EntityType> {
  entityId: string

  async softDeleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
