import { EntityModel } from '@/domain/common'
import { DeleteEntityByIdRepository } from '@/protocols/repositories'

export class DeleteEntityByIdRepositorySpy<EntityType extends EntityModel> implements DeleteEntityByIdRepository<EntityType> {
  entityId: string

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entityId = entityId
    return undefined
  }
}
