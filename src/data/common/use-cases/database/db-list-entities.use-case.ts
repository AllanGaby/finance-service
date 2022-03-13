import { ListEntitiesUseCase, ListEntitiesDTO, OrderDirection, ListEntityModel } from '@/domain/common'
import { ListEntitiesRepository, CountEntitiesRepository, RepositoryOptionsModel } from '@/protocols/repositories'

export class DbListEntitiesUseCase<EntityType> implements ListEntitiesUseCase<EntityType> {
  constructor (
    private readonly countEntitiesRepository: CountEntitiesRepository<EntityType>,
    private readonly listEntitiesRepository: ListEntitiesRepository<EntityType>,
    private readonly options: RepositoryOptionsModel = {
      returnDeletedEntities: false
    }
  ) {}

  async list ({ textToSearch, page = 1, recordsPerPage = 15, orderDirection = OrderDirection.ASC, orderColumn, filters, complete = false }: ListEntitiesDTO): Promise<ListEntityModel<EntityType>> {
    const options: RepositoryOptionsModel = {
      returnDeletedEntities: this.options.returnDeletedEntities,
      returnCompleteData: complete
    }
    const recordCount = await this.countEntitiesRepository.count(textToSearch, filters, options) as number
    if (recordCount === 0) {
      return {
        data: [],
        last_page: 0,
        page: 0,
        record_count: 0
      }
    }
    const pageSize = recordsPerPage <= 0 ? 15 : recordsPerPage
    const skip = Number(page) <= 1 ? 0 : (page - 1) * pageSize
    const lastPage = recordCount % pageSize === 0 ? Math.trunc(recordCount / pageSize) : Math.trunc(recordCount / pageSize) + 1
    const data = await this.listEntitiesRepository.list({
      skip,
      recordsPerPage: pageSize,
      textToSearch,
      orderColumn,
      orderDirection,
      filters
    }, options)

    return {
      data,
      last_page: Number(Math.round(lastPage)),
      page: Number(page),
      record_count: Number(recordCount)
    }
  }
}
