import { CustomFilterModel } from '@/domain/common'
import { RepositoryOptionsModel } from '@/protocols/repositories'

export interface CountEntitiesRepository<EntityType> {
  count: (textToSearch?: string, filters?: CustomFilterModel[], options?: RepositoryOptionsModel) => Promise<number | EntityType>
}
