import { UpdateEntityInBulkRepository } from '@/protocols/repositories'
import { EntityModel } from '@/domain/common'

export class UpdateEntityInBulkRepositorySpy<EntityType extends EntityModel> implements UpdateEntityInBulkRepository<EntityType> {
  params: Array<Partial<EntityType>>
  entity: EntityType[]

  async updateInBulk (params: Array<Partial<EntityType>>): Promise<EntityType[]> {
    this.params = params
    return this.entity
  }
}
