import { EntityModel } from '@/domain/common'
import { ListEntitiesRepository, ListEntitiesRepositoryDTO } from '@/protocols/repositories'
import { random } from 'faker'

export class ListEntitiesRepositorySpy<EntityType extends EntityModel> implements ListEntitiesRepository<EntityType> {
  filter: ListEntitiesRepositoryDTO
  entities: EntityType[] = [
    random.objectElement<EntityType>(),
    random.objectElement<EntityType>(),
    random.objectElement<EntityType>()
  ]

  async list (filter: ListEntitiesRepositoryDTO): Promise<EntityType[]> {
    this.filter = filter
    return this.entities
  }
}
