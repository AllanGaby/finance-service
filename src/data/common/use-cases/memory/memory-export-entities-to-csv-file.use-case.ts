import { ExportEntitiesToFileUseCase, ExportEntitiesToCSVFileDTO, EntityColumnsToExportCSVFileDTO } from '@/domain/common'
import { InvalidColumnsError } from '@/data/common/errors'
import { ExportToCSVFileProtocol, ColumnToExportModel } from '@/protocols/csv'
import { v4 } from 'uuid'

export class MemoryExportEntitiesToCSVFileUseCase<EntityType> implements ExportEntitiesToFileUseCase<EntityType> {
  constructor (
    private readonly validColumnsToExport: EntityColumnsToExportCSVFileDTO,
    private readonly exportToCSVAdapter: ExportToCSVFileProtocol,
    private readonly temporaryFileDir: string
  ) {}

  async exportToFile ({ columns, data }: ExportEntitiesToCSVFileDTO<EntityType>): Promise<ArrayBuffer | EntityType> {
    const columnsToExport: ColumnToExportModel[] = []
    const entityKeys = Object.keys(this.validColumnsToExport)
    columns.forEach(column => {
      if (entityKeys.includes(column)) {
        columnsToExport.push(this.validColumnsToExport[column])
      }
    })
    if (columnsToExport.length === 0) {
      throw new InvalidColumnsError()
    }
    const destineFileName = v4()
    const destinationFilePath = `${this.temporaryFileDir}/${destineFileName}.csv`
    return this.exportToCSVAdapter.exportToCSV({
      data: data,
      filePath: destinationFilePath,
      columns: columnsToExport
    })
  }
}
