import { EntityModel } from '@/domain/common'
import { DeleteEntitiesByListIdRepository } from '@/protocols/repositories'

export class DeleteEntitiesByListIdRepositorySpy<EntityType extends EntityModel> implements DeleteEntitiesByListIdRepository<EntityType> {
  listEntityId: string[]

  async deleteByListId (listEntityId: string[]): Promise<EntityType | undefined> {
    this.listEntityId = listEntityId
    return undefined
  }
}
