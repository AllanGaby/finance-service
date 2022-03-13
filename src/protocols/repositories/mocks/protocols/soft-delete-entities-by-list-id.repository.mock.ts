import { EntityModel } from '@/domain/common'
import { SoftDeleteEntitiesByListIdRepository } from '@/protocols/repositories'

export class SoftDeleteEntitiesByListIdRepositorySpy<EntityType extends EntityModel> implements SoftDeleteEntitiesByListIdRepository<EntityType> {
  listEntityId: string[]

  async softDeleteByListId (listEntityId: string[]): Promise<EntityType | undefined> {
    this.listEntityId = listEntityId
    return undefined
  }
}
