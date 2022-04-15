import { ExportEntitiesToFileUseCase, ExportEntitiesToXLSXFileDTO, EntityColumnsToExportXLSXFileDTO } from '@/domain/common'
import { InvalidColumnsError } from '@/data/common/errors'
import { SaveToBufferProtocol, ExcelColumnHeaderModel, ExcelColumnDataModel } from '@/protocols/excel'

export class MemoryExportEntitiesToXLSXFileUseCase<EntityType> implements ExportEntitiesToFileUseCase<EntityType> {
  constructor (
    private readonly validColumnsToExport: EntityColumnsToExportXLSXFileDTO,
    private readonly exportToXLSXAdapter: SaveToBufferProtocol,
    private readonly logoFilePath: string,
    private readonly entityName: string
  ) {}

  async exportToFile ({ columns, data }: ExportEntitiesToXLSXFileDTO<EntityType>): Promise<ArrayBuffer | EntityType> {
    const columnsToExport: ExcelColumnHeaderModel[] = []
    const entityKeys = Object.keys(this.validColumnsToExport)
    columns.forEach(column => {
      if (entityKeys.includes(column)) {
        columnsToExport.push(this.validColumnsToExport[column])
      }
    })
    if (columnsToExport.length === 0) {
      throw new InvalidColumnsError()
    }
    const columnData: ExcelColumnDataModel[][] = []
    data.forEach(entity => {
      const row: ExcelColumnDataModel[] = []
      columnsToExport.forEach(column => {
        row.push({
          content: entity[column.header]
        })
      })
      columnData.push(row)
    })
    return this.exportToXLSXAdapter.saveToBuffer([{
      name: this.entityName,
      worksheetHeader: {
        logoPath: this.logoFilePath
      },
      columnHeaders: columnsToExport,
      columnData
    }])
  }
}
