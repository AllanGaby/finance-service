import { EntityModel } from '@/domain/common'
import { SoftDeleteEntityRepository } from '@/protocols/repositories'

export class SoftDeleteEntityRepositorySpy<EntityType extends EntityModel> implements SoftDeleteEntityRepository<EntityType> {
  filter: Partial<EntityType>

  async softDelete (filter: Partial<EntityType>): Promise<EntityType | undefined> {
    this.filter = filter
    return undefined
  }
}
