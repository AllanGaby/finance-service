import { ListEntitiesAndExportToFileDTO } from '@/domain/common'

export interface ListEntitiesAndExportToFileUseCase<RecortType> {
  listAndExport: (filter: ListEntitiesAndExportToFileDTO) => Promise<ArrayBuffer | RecortType>
}
