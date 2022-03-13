import {
  ListEntitiesAndExportToFileUseCase,
  ListEntitiesAndExportToFileDTO,
  ExportEntitiesToFileUseCase,
  ListEntitiesUseCase
} from '@/domain/common'

export class DbListEntitiesAndExportToFileUseCase<EntityType> implements ListEntitiesAndExportToFileUseCase<EntityType> {
  constructor (
    private readonly exportEntitiesToFileUseCase: ExportEntitiesToFileUseCase<EntityType>,
    private readonly listEntitiesUseCase: ListEntitiesUseCase<EntityType>
  ) {}

  async listAndExport ({ columns, ...filter }: ListEntitiesAndExportToFileDTO): Promise<ArrayBuffer | EntityType> {
    filter.page = 1
    filter.recordsPerPage = 999999999
    const entities = await this.listEntitiesUseCase.list(filter)
    return this.exportEntitiesToFileUseCase.exportToFile({
      columns,
      data: entities.data
    })
  }
}
