import { ExportEntitiesToFileUseCase, ExportEntitiesToCSVFileDTO } from '@/domain/common'

export class ExportEntitiesToFileUseCaseSpy<EntityType> implements ExportEntitiesToFileUseCase<EntityType> {
  params: ExportEntitiesToCSVFileDTO<EntityType>
  fileContent: ArrayBuffer

  async exportToFile (params: ExportEntitiesToCSVFileDTO<EntityType>): Promise<ArrayBuffer | EntityType> {
    this.params = params
    return this.fileContent
  }
}
