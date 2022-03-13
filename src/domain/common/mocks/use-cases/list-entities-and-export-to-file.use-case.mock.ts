import { ListEntitiesAndExportToFileUseCase, ListEntitiesAndExportToFileDTO } from '@/domain/common'

export class ListEntitiesAndExportToFileUseCaseSpy<RecortType> implements ListEntitiesAndExportToFileUseCase<RecortType> {
  filter: ListEntitiesAndExportToFileDTO
  fileContent: ArrayBuffer

  async listAndExport (filter: ListEntitiesAndExportToFileDTO): Promise<ArrayBuffer | RecortType> {
    this.filter = filter
    return this.fileContent
  }
}
