import { EntityModel, CustomFilterModel } from '@/domain/common'
import { GetOneEntityRepository, RepositoryOptionsModel } from '@/protocols/repositories'

export class GetOneEntityRepositorySpy<EntityType extends EntityModel> implements GetOneEntityRepository<EntityType> {
  filters: CustomFilterModel[]
  options?: RepositoryOptionsModel
  entity: EntityType

  async getOne (filters: CustomFilterModel[], options?: RepositoryOptionsModel): Promise<EntityType> {
    this.filters = filters
    this.options = options
    return this.entity
  }
}
