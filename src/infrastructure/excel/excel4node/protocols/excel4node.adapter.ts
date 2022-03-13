import { SetWorksheetDataProtocol, SaveToFileProtocol, SaveToBufferProtocol, SetWorksheetDataDTO, WorksheetHeaderModel } from '@/protocols/excel'
import { Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel, ColumnHeaderStyles } from '@/infrastructure/excel'
import { Worksheet, Workbook } from 'excel4node'

export class Excel4NodeAdapter
implements SetWorksheetDataProtocol<Worksheet>,
  SaveToFileProtocol,
  SaveToBufferProtocol {
  private setWorksheetHeader (worksheet: Worksheet, { logoPath, headers, subHeaders }: WorksheetHeaderModel): void {
    if (logoPath) {
      worksheet.column(1).setWidth(12)
      worksheet.cell(1, 1, 5, 1, true).string('')
      worksheet.addImage({
        path: logoPath,
        type: 'picture',
        position: {
          type: 'absoluteAnchor',
          x: '0in',
          y: '0in'
        }
      })
    }

    let worksheetHeaderLine = 1
    const startHeaderColumn = logoPath ? 2 : 1
    headers?.forEach(item => {
      worksheet.cell(worksheetHeaderLine, startHeaderColumn, worksheetHeaderLine, startHeaderColumn + 7, true).string(item)
      worksheetHeaderLine++
    })
    subHeaders?.forEach(item => {
      worksheet.cell(worksheetHeaderLine, startHeaderColumn, worksheetHeaderLine, startHeaderColumn + 7, true).string(item)
      worksheetHeaderLine++
    })
  }

  private setColumnHeaders (worksheet: Worksheet, hasLogo: boolean, contentLine: number, columnHeaders: Excel4NodeColumnHeaderModel[]): void {
    columnHeaders.forEach((column, columnIndex) => {
      const { width, header, style } = column
      const excelColumnIndex = columnIndex + 1
      let columnWidth: number = width || 10
      if ((columnIndex === 0) && (hasLogo)) {
        columnWidth = width > 12 ? width : 12
      }
      worksheet
        .column(excelColumnIndex)
        .setWidth(columnWidth)
      worksheet
        .cell(contentLine, excelColumnIndex)
        .string(header)
        .style(style || ColumnHeaderStyles)
    })
  }

  setWorksheetData (worksheet: Worksheet, { worksheetHeader, columnHeaders, columnData }: SetWorksheetDataDTO<Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel>): void {
    let contentLine: number = 1
    let hasLogo = false
    if (worksheetHeader) {
      this.setWorksheetHeader(worksheet, worksheetHeader)
      hasLogo = Boolean(worksheetHeader.logoPath)
      contentLine = hasLogo ? 6 : contentLine
      const headerLines = worksheetHeader.headers?.length + worksheetHeader.subHeaders?.length + 1
      contentLine = headerLines > contentLine ? headerLines : contentLine
    }
    this.setColumnHeaders(worksheet, hasLogo, contentLine, columnHeaders)
    worksheet.row(contentLine).freeze()
    contentLine++

    columnData.forEach(rowData => {
      rowData.forEach((column, columnIndex) => {
        const { content, comment, style } = column
        const excelColumnIndex = columnIndex + 1
        const cell = worksheet.cell(contentLine, excelColumnIndex).string(content)
        if (style) {
          cell.style(style)
        }
        if (comment) {
          cell.comment(comment)
        }
      })
      contentLine++
    })
  }

  saveToFile (filePath: string, setSheetDataDTOList: Array<SetWorksheetDataDTO<Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel>> = []): void {
    const excel4nodeClient = new Workbook()
    setSheetDataDTOList.forEach(setSheetDataDTO => {
      const sheet = excel4nodeClient.addWorksheet(setSheetDataDTO.name)
      this.setWorksheetData(sheet, setSheetDataDTO)
    })
    excel4nodeClient.write(filePath)
  }

  async saveToBuffer (setSheetDataDTOList: Array<SetWorksheetDataDTO<Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel>> = []): Promise<Buffer> {
    const excel4nodeClient = new Workbook()
    setSheetDataDTOList.forEach(setSheetDataDTO => {
      const sheet = excel4nodeClient.addWorksheet(setSheetDataDTO.name)
      this.setWorksheetData(sheet, setSheetDataDTO)
    })
    return excel4nodeClient.writeToBuffer()
  }
}
