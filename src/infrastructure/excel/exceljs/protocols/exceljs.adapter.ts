import {
  SetWorksheetDataDTO,
  SetWorksheetDataProtocol,
  SaveToFileProtocol,
  SaveToBufferProtocol,
  ExcelColumnDataModel,
  ExcelColumnHeaderModel,
  ExcelValidationErrorType,
  ExcelValidationType
} from '@/protocols/excel'
import {
  ExcelJSColumnHeaderModel,
  ExcelJSHeaderBackgroundStyle,
  ExcelJSHeaderFontStyle
} from '@/infrastructure/excel'
import { Worksheet, Workbook, Column } from 'exceljs'

export class ExcelJSAdapter
implements SetWorksheetDataProtocol<Worksheet>,
  SaveToFileProtocol,
  SaveToBufferProtocol {
  workbook: Workbook

  constructor () {
    this.workbook = new Workbook()
  }

  private setWorksheetHeader (sheet: Worksheet, hasLogo: boolean, headers: string[]): void {
    let sheetHeaderLine = 1
    const startHeaderColumn = hasLogo ? 2 : 1
    headers?.forEach(header => {
      sheet.getCell(sheetHeaderLine, startHeaderColumn).value = header
      sheet.mergeCells([sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7])
      sheetHeaderLine++
    })
  }

  private setWorksheetLogo (sheet: Worksheet, logoPath: string): void {
    const image = sheet.workbook.addImage({
      filename: logoPath,
      extension: 'png'
    })
    sheet.addImage(image, 'A1:A6')
    sheet.getColumn(1).width = 12
    sheet.mergeCells('A1:A6')
  }

  private async setColumnHeaders (sheet: Worksheet, hasLogo: boolean, contentLine: number, columnHeaders: ExcelJSColumnHeaderModel[]): Promise<void> {
    const data = {}
    sheet.columns = columnHeaders.map<Partial<Column>>((column, columnIndex) => {
      const { width, header, caption } = column
      data[header] = header
      let columnWidth: number = width || 10
      if ((columnIndex === 0) && (hasLogo)) {
        columnWidth = width > 12 ? width : 12
      }
      const captions: string[] = []
      for (let index = 2; index <= contentLine; index++) {
        captions.push('')
      }
      captions.push(caption)
      return {
        header: captions,
        key: header,
        width: columnWidth
      }
    })
    columnHeaders.forEach((column, columnIndex) => {
      sheet.getCell(contentLine, columnIndex + 1).font = ExcelJSHeaderFontStyle
      sheet.getCell(contentLine, columnIndex + 1).fill = ExcelJSHeaderBackgroundStyle
    })
    sheet.addRow(data)
    sheet.getCell(contentLine + 1, columnHeaders.length + 1).value = Object.values(data).join(',')
    sheet.getRow(contentLine + 1).hidden = true
  }

  private setColumnsValidations (sheet: Worksheet, columnHeaders: ExcelJSColumnHeaderModel[]): void {
    columnHeaders.forEach((column, columnIndex) => {
      const {
        items,
        validationType: validationTypeDefault,
        error = 'Escolha um valor',
        errorType = ExcelValidationErrorType.Stop,
        promptTitle = 'Escolha um valor',
        prompt = 'Escolha um valor'
      } = column
      let validationType = validationTypeDefault
      if (items) {
        validationType = ExcelValidationType.List
      }
      if (validationType) {
        const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
        for (let rowIndex = 1; rowIndex < 10000; rowIndex++) {
          sheet.getCell(rowIndex, columnIndex + 1).dataValidation = {
            promptTitle,
            type: validationType as any,
            operator: isNumber ? 'greaterThanOrEqual' : undefined,
            allowBlank: false,
            prompt,
            error,
            formulae: isNumber ? undefined : [items?.join(',')],
            showErrorMessage: true,
            errorStyle: errorType
          }
        }
      }
    })
  }

  setWorksheetData (sheet: Worksheet, { worksheetHeader, columnHeaders, columnData }: SetWorksheetDataDTO<ExcelColumnHeaderModel, ExcelColumnDataModel>): void {
    let contentLine: number = 1
    let hasLogo = false
    hasLogo = Boolean(worksheetHeader?.logoPath)
    if (hasLogo) {
      this.setWorksheetLogo(sheet, worksheetHeader.logoPath)
    }
    contentLine = hasLogo ? 7 : contentLine
    contentLine = Math.max((worksheetHeader?.headers?.length || 0) + 1, contentLine)
    this.setColumnHeaders(sheet, hasLogo, contentLine, columnHeaders)
    this.setWorksheetHeader(sheet, hasLogo, worksheetHeader?.headers)
    contentLine++
    sheet.views = [{
      state: 'frozen',
      ySplit: contentLine
    }]
    contentLine++
    this.setColumnsValidations(sheet, columnHeaders)
    columnData.forEach(rowData => {
      rowData.forEach((column, columnIndex) => {
        sheet.getCell(contentLine, columnIndex + 1).value = column.content
      })
      contentLine++
    })
  }

  async saveToFile (filePath: string, setWorksheetDataDTOList: Array<SetWorksheetDataDTO<ExcelColumnHeaderModel, ExcelColumnDataModel>>): Promise<void> {
    if (setWorksheetDataDTOList) {
      for (const setWorksheetDataDTO of setWorksheetDataDTOList) {
        if (this.workbook.getWorksheet(setWorksheetDataDTO.name)) {
          this.workbook.removeWorksheet(setWorksheetDataDTO.name)
        }
        const sheet = this.workbook.addWorksheet(setWorksheetDataDTO.name)
        this.setWorksheetData(sheet, setWorksheetDataDTO)
        if (setWorksheetDataDTO.password) {
          sheet.protect(setWorksheetDataDTO.password, {
            deleteColumns: false,
            deleteRows: false
          })
        }
      }
    }
    await this.workbook.xlsx.writeFile(filePath)
  }

  async saveToBuffer (setWorksheetDataDTOList: Array<SetWorksheetDataDTO<ExcelColumnHeaderModel, ExcelColumnDataModel>>): Promise<Buffer> {
    if (setWorksheetDataDTOList) {
      for (const setWorksheetDataDTO of setWorksheetDataDTOList) {
        if (this.workbook.getWorksheet(setWorksheetDataDTO.name)) {
          this.workbook.removeWorksheet(setWorksheetDataDTO.name)
        }
        const sheet = this.workbook.addWorksheet(setWorksheetDataDTO.name)
        this.setWorksheetData(sheet, setWorksheetDataDTO)
        if (setWorksheetDataDTO.password) {
          sheet.protect(setWorksheetDataDTO.password, {
            deleteColumns: false,
            deleteRows: false
          })
        }
      }
    }
    const fileContent = await this.workbook.xlsx.writeBuffer() as Buffer
    return fileContent
  }
}
