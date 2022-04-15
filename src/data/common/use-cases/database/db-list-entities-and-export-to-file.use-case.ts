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
    const entities = await this.listEntitiesUseCase.list({
      ...filter,
      page: 1,
      recordsPerPage: 999999999
    })
    return this.exportEntitiesToFileUseCase.exportToFile({
      columns,
      data: entities.data
    })
  }
}
