import { EntityModel, CustomFilterModel } from '@/domain/common'
import { RepositoryOptionsModel } from '@/protocols/repositories'

export interface GetOneEntityRepository<EntityType extends EntityModel> {
  getOne: (filters: CustomFilterModel[], options?: RepositoryOptionsModel) => Promise<EntityType>
}
