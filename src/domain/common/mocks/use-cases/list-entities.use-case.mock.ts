import { ListEntitiesUseCase, EntityModel, ListEntitiesDTO, ListEntityModel } from '@/domain/common'

export class ListEntitiesUseCaseSpy<EntityType extends EntityModel>
implements ListEntitiesUseCase<EntityType> {
  filter: ListEntitiesDTO
  entities: ListEntityModel<EntityType>

  async list (filter: ListEntitiesDTO): Promise<ListEntityModel<EntityType>> {
    this.filter = filter
    return this.entities
  }
}
