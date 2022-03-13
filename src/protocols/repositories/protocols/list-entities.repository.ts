import { ListEntitiesRepositoryDTO, RepositoryOptionsModel } from '@/protocols/repositories'

export interface ListEntitiesRepository<EntityType> {
  list: (filter: ListEntitiesRepositoryDTO, options?: RepositoryOptionsModel) => Promise<EntityType[]>
}
