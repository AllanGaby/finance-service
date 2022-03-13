import { CustomFilterModel, EntityModel } from '@/domain/common'
import { CountEntitiesRepository } from '@/protocols/repositories'
import { datatype } from 'faker'

export class CountEntitiesRepositorySpy<EntityType extends EntityModel> implements CountEntitiesRepository<EntityType> {
  filters: CustomFilterModel[]
  textToSearch: string
  recordCount: number = datatype.number({ min: 1 })

  async count (textToSearch?: string, filters?: CustomFilterModel[]): Promise<number | EntityType> {
    this.textToSearch = textToSearch
    this.filters = filters
    return this.recordCount
  }
}
