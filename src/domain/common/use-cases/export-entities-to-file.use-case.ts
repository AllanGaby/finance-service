import { ExportEntitiesToCSVFileDTO } from '@/domain/common'

export interface ExportEntitiesToFileUseCase<EntityType extends Object> {
  exportToFile: (params: ExportEntitiesToCSVFileDTO<EntityType>) => Promise<ArrayBuffer | EntityType>
}
