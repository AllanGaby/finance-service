import { ExcelJSAdapter } from './exceljs.adapter'
import {
  ExcelJSWorksheetSpy,
  ExcelJSColumnSpy,
  ExcelJSHeaderFontStyle,
  ExcelJSHeaderBackgroundStyle,
  ExcelJSCellSpy,
  ExcelJSRowSpy
} from '@/infrastructure/excel'
import {
  ExcelColumnDataModel,
  ExcelColumnHeaderModel,
  SetWorksheetDataDTO,
  mockSetWorksheetDataDTO,
  mockExcelColumnHeaderModel,
  mockWorksheetHeaderModel,
  ExcelValidationErrorType,
  ExcelValidationType,
  mockExcelColumnDataModel
} from '@/protocols/excel'
import { Worksheet, Workbook, Cell, Column, Row } from 'exceljs'
import { datatype, internet, system } from 'faker'

let sheet: Worksheet
let workbook: Workbook

jest.mock('exceljs', () => ({
  Worksheet: jest.fn().mockImplementation(() => sheet),
  Workbook: jest.fn().mockImplementation(() => workbook)
}))

type sutTypes = {
  sut: ExcelJSAdapter
  sheet: Worksheet
  contentLine: number
  workbook: Workbook
  cell: Cell
  column: Column
  row: Row
  setWorksheetDataDTO: SetWorksheetDataDTO<ExcelColumnHeaderModel, ExcelColumnDataModel>
  setWorksheetDataDTOList: Array<SetWorksheetDataDTO<ExcelColumnHeaderModel, ExcelColumnDataModel>>
}

const makeSut = (): sutTypes => {
  const sut = new ExcelJSAdapter()
  sheet = new ExcelJSWorksheetSpy()
  workbook = sheet.workbook
  sut.workbook = workbook
  const cell = new ExcelJSCellSpy()
  jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
  const column = new ExcelJSColumnSpy()
  jest.spyOn(sheet, 'getColumn').mockReturnValue(column)
  const row = new ExcelJSRowSpy()
  jest.spyOn(sheet, 'getRow').mockReturnValue(row)
  const setWorksheetDataDTO = mockSetWorksheetDataDTO([
    mockExcelColumnHeaderModel(),
    mockExcelColumnHeaderModel(),
    mockExcelColumnHeaderModel(),
    mockExcelColumnHeaderModel(),
    mockExcelColumnHeaderModel()
  ], [[
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel()
  ], [
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel(),
    mockExcelColumnDataModel()
  ]])
  return {
    sut,
    sheet,
    row,
    contentLine: setWorksheetDataDTO.worksheetHeader.headers.length + 1,
    cell,
    column,
    workbook,
    setWorksheetDataDTO,
    setWorksheetDataDTOList: [
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO()
    ]
  }
}

describe('ExcelJSAdapter', () => {
  describe('SetSheetHeader Method', () => {
    describe('SheetHeader is provided', () => {
      describe('Add Logo in Sheet', () => {
        describe('LogoPath is provided', () => {
          test('Should change width of column 1', () => {
            const { sut, setWorksheetDataDTO, sheet, column } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(column.width).toBe(12)
          })

          test('Should group first 5 rows', () => {
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            const mergeCellsSpy = jest.spyOn(sheet, 'mergeCells')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(mergeCellsSpy).toHaveBeenCalledWith('A1:A6')
          })

          test('Should call addImage with correct values to include image in workbook', () => {
            const { sut, setWorksheetDataDTO, sheet, workbook } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            const addImageSpy = jest.spyOn(workbook, 'addImage')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(addImageSpy).toHaveBeenCalledWith({
              filename: setWorksheetDataDTO.worksheetHeader.logoPath,
              extension: 'png'
            })
          })

          test('Should call addImage with correct values to include image in cells', () => {
            const { sut, setWorksheetDataDTO, sheet, workbook } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            const imageId = datatype.number()
            jest.spyOn(workbook, 'addImage').mockReturnValue(imageId)
            const addImageSpy = jest.spyOn(sheet, 'addImage')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(addImageSpy).toHaveBeenCalledWith(imageId, 'A1:A6')
          })
        })

        describe('LogoPath is not provided', () => {
          test('Should not call addImage', () => {
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            delete setWorksheetDataDTO.worksheetHeader.logoPath
            const addImageSpy = jest.spyOn(sheet, 'addImage')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(addImageSpy).not.toHaveBeenCalled()
          })
        })
      })

      describe('Add Headers is Sheet', () => {
        describe('LogoPath is provided', () => {
          test('Should call mergeCells with correct values for each headers', () => {
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            const mergeCellsSpy = jest.spyOn(sheet, 'mergeCells')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            let sheetHeaderLine = 1
            const startHeaderColumn = 2
            setWorksheetDataDTO.worksheetHeader.headers.forEach(header => {
              expect(mergeCellsSpy).toHaveBeenCalledWith([sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7])
              sheetHeaderLine++
            })
          })
        })

        describe('LogoPath is not provided', () => {
          test('Should call mergeCells with correct values for each headers', () => {
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
            delete setWorksheetDataDTO.worksheetHeader.logoPath
            const mergeCellsSpy = jest.spyOn(sheet, 'mergeCells')
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            let sheetHeaderLine = 1
            const startHeaderColumn = 1
            setWorksheetDataDTO.worksheetHeader.headers.forEach(header => {
              expect(mergeCellsSpy).toHaveBeenCalledWith([sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7])
              sheetHeaderLine++
            })
          })
        })

        test('Should set correct cell values for each headers if headers is provided', () => {
          const { sut, setWorksheetDataDTO, sheet } = makeSut()
          setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
          const headerCells: Cell[] = []
          setWorksheetDataDTO.worksheetHeader.headers.forEach(header => {
            headerCells.push(new ExcelJSCellSpy())
          })
          sut.setWorksheetData(sheet, setWorksheetDataDTO)
          setWorksheetDataDTO.worksheetHeader.headers.forEach((header, index) => {
            headerCells[index].value = header
          })
        })

        test('Should not set headers values if headers is not provided', () => {
          const { sut, setWorksheetDataDTO, sheet } = makeSut()
          setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
          const headers = setWorksheetDataDTO.worksheetHeader.headers
          delete setWorksheetDataDTO.worksheetHeader.headers
          const headerCells: Cell[] = []
          headers.forEach(header => {
            headerCells.push(new ExcelJSCellSpy())
          })
          sut.setWorksheetData(sheet, setWorksheetDataDTO)
          headers.forEach((header, index) => {
            headerCells[index].value = undefined
          })
        })
      })
    })

    describe('SheetHeader is not provided', () => {
      test('Should not call addImage', () => {
        const { sut, setWorksheetDataDTO, sheet } = makeSut()
        delete setWorksheetDataDTO.worksheetHeader
        const addImageSpy = jest.spyOn(sheet, 'addImage')
        sut.setWorksheetData(sheet, setWorksheetDataDTO)
        expect(addImageSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('SetColumnHeader Method', () => {
    test('Should set sheet columns with correct values if LogoPath is provided', () => {
      const { sut, sheet, setWorksheetDataDTO, contentLine } = makeSut()
      const contentLineWithLogo = contentLine > 6 ? contentLine : 6
      const expectedColumns = setWorksheetDataDTO.columnHeaders.map<Partial<Column>>((column, columnIndex) => {
        const { width, header, caption } = column
        let columnWidth: number = width || 10
        if (columnIndex === 0) {
          columnWidth = width > 12 ? width : 12
        }
        const captions: string[] = []
        for (let index = 1; index <= contentLineWithLogo; index++) {
          captions.push('')
        }
        captions.push(caption)
        return {
          header: captions,
          key: header,
          width: columnWidth
        }
      })
      sut.setWorksheetData(sheet, setWorksheetDataDTO)
      expect(sheet.columns).toEqual(expectedColumns)
    })

    test('Should set sheet columns with correct values if LogoPath is not provided', () => {
      const { sut, sheet, setWorksheetDataDTO, contentLine } = makeSut()
      delete setWorksheetDataDTO.worksheetHeader.logoPath
      const expectedColumns = setWorksheetDataDTO.columnHeaders.map<Partial<Column>>(column => {
        const { width, header, caption } = column
        const columnWidth: number = width || 10
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
      sut.setWorksheetData(sheet, setWorksheetDataDTO)
      expect(sheet.columns).toEqual(expectedColumns)
    })

    test('Should set correct font styles in column headers', () => {
      const { sut, sheet, setWorksheetDataDTO, cell } = makeSut()
      delete setWorksheetDataDTO.worksheetHeader
      sut.setWorksheetData(sheet, setWorksheetDataDTO)
      expect(cell.font).toEqual(ExcelJSHeaderFontStyle)
    })

    test('Should set correct fill styles in column headers', () => {
      const { sut, sheet, setWorksheetDataDTO, cell } = makeSut()
      delete setWorksheetDataDTO.worksheetHeader
      sut.setWorksheetData(sheet, setWorksheetDataDTO)
      expect(cell.fill).toEqual(ExcelJSHeaderBackgroundStyle)
    })
  })

  describe('SetSheetData Method', () => {
    describe('Freeze Header line', () => {
      test('Should set view with correct values if sheetHeader is provided', () => {
        const { sut, sheet, setWorksheetDataDTO } = makeSut()
        setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
        sut.setWorksheetData(sheet, setWorksheetDataDTO)
        expect(sheet.views).toEqual([{
          state: 'frozen',
          ySplit: setWorksheetDataDTO.worksheetHeader.headers.length + 4
        }])
      })
    })

    describe('Set Content Data', () => {
      describe('Add data validations', () => {
        describe('ValidationType', () => {
          test('Should not set DataValidation if validationType and items is not provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            delete columnHeader.validationType
            delete columnHeader.items
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toBeFalsy()
          })

          test('Should set DataValidation with correct value if only validationType is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            delete columnHeader.items
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const { promptTitle, validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if only items is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            delete columnHeader.validationType
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const { promptTitle, error, errorType, prompt, items } = columnHeader
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: ExcelValidationType.List,
              operator: undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: [items.join(',')],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if validationType and items are provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const { promptTitle, error, errorType, prompt, items } = columnHeader
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: ExcelValidationType.List,
              operator: undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: [items?.join(',')],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })
        })

        describe('Error', () => {
          test('Should set DataValidation with correct value if error is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if error is not provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.error
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error: 'Escolha um valor',
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })
        })

        describe('ErrorType', () => {
          test('Should set DataValidation with correct value if errorType is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if errorType is not provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.errorType
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: ExcelValidationErrorType.Stop
            })
          })
        })

        describe('PromptTitle', () => {
          test('Should set DataValidation with correct value if promptTitle is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if promptTitle is not provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.promptTitle
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle: 'Escolha um valor',
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })
        })

        describe('Prompt', () => {
          test('Should set DataValidation with correct value if prompt is provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, errorType, prompt } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt,
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })

          test('Should set DataValidation with correct value if prompt is not provided', () => {
            const columnHeader = mockExcelColumnHeaderModel()
            const { sut, setWorksheetDataDTO, sheet } = makeSut()
            delete columnHeader.prompt
            delete columnHeader.items
            setWorksheetDataDTO.columnHeaders = [columnHeader]
            const cell = new ExcelJSCellSpy()
            jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
            const { promptTitle, validationType, error, errorType } = columnHeader
            const isNumber = [ExcelValidationType.Decimal, ExcelValidationType.Integer].includes(validationType)
            sut.setWorksheetData(sheet, setWorksheetDataDTO)
            expect(cell.dataValidation).toEqual({
              promptTitle,
              type: validationType,
              operator: isNumber ? 'greaterThanOrEqual' : undefined,
              allowBlank: false,
              prompt: 'Escolha um valor',
              error,
              formulae: isNumber ? undefined : [undefined],
              showErrorMessage: true,
              errorStyle: errorType
            })
          })
        })
      })

      describe('Content', () => {
        test('Should call GetCell with correct values for each data content if sheetHeader is provided', () => {
          const { sut, setWorksheetDataDTO, sheet } = makeSut()
          setWorksheetDataDTO.worksheetHeader = mockWorksheetHeaderModel()
          const cellSpy = jest.spyOn(sheet, 'getCell')
          sut.setWorksheetData(sheet, setWorksheetDataDTO)
          let contentLine = setWorksheetDataDTO.worksheetHeader.headers.length + 1
          setWorksheetDataDTO.columnData.forEach((row) => {
            row.forEach((column, columnIndex) => {
              expect(cellSpy).toHaveBeenCalledWith(contentLine, columnIndex + 1)
              contentLine++
            })
          })
        })

        test('Should call GetCell with correct values for each data content if sheetHeader is not provided', () => {
          const { sut, setWorksheetDataDTO, sheet } = makeSut()
          delete setWorksheetDataDTO.worksheetHeader
          const cell = new ExcelJSCellSpy()
          jest.spyOn(sheet, 'getCell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'getCell')
          sut.setWorksheetData(sheet, setWorksheetDataDTO)
          let contentLine = 1
          setWorksheetDataDTO.columnData.forEach((row) => {
            row.forEach((column, columnIndex) => {
              expect(cellSpy).toHaveBeenCalledWith(contentLine, columnIndex + 1)
              contentLine++
            })
          })
        })
      })
    })
  })

  describe('SaveToFile Method', () => {
    describe('SheetData is provided', () => {
      describe('Remove old Workshhet', () => {
        test('Should call getWorksheet with correct values', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const getWorksheetSpy = jest.spyOn(workbook, 'getWorksheet')
          await sut.saveToFile(system.filePath(), setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(getWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should call removeWorksheet with correct value if getWorksheet return any sheet', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'getWorksheet').mockReturnValue(sheet)
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const removeWorksheetSpy = jest.spyOn(workbook, 'removeWorksheet')
          await sut.saveToFile(system.filePath(), setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(removeWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should not call removeWorksheet if getWorksheet return undefined', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'getWorksheet').mockReturnValue(undefined)
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const removeWorksheetSpy = jest.spyOn(workbook, 'removeWorksheet')
          await sut.saveToFile(system.filePath(), setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(removeWorksheetSpy).not.toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })
      })

      describe('Add new Worksheet', () => {
        test('Should call addWorksheet with correct value', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
          await sut.saveToFile(system.filePath(), setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(addWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should call addWorksheet with correct value', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const setSheetDataSpy = jest.spyOn(sut, 'setWorksheetData')
          await sut.saveToFile(system.filePath(), setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(setSheetDataSpy).toHaveBeenCalledWith(sheet, setWorksheetDataDTO)
          })
        })

        test('Should call protect with correct value if password is provided', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const dtoWithPassword = setWorksheetDataDTOList.map(setWorksheetDataDTO => ({
            ...setWorksheetDataDTO,
            password: internet.password()
          }))
          const protectSpy = jest.spyOn(sheet, 'protect')
          await sut.saveToFile(system.filePath(), dtoWithPassword)
          dtoWithPassword.forEach(setWorksheetDataDTO => {
            expect(protectSpy).toHaveBeenCalledWith(setWorksheetDataDTO.password, {
              deleteColumns: false,
              deleteRows: false
            })
          })
        })
      })
    })

    describe('SheetData is not provided', () => {
      test('Should not call addWorksheet', async () => {
        const { sut, workbook } = makeSut()
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        await sut.saveToFile(system.filePath(), undefined)
        expect(addWorksheetSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('SaveToBuffer Method', () => {
    describe('SheetData is provided', () => {
      describe('Remove old Workshhet', () => {
        test('Should call getWorksheet with correct values', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const getWorksheetSpy = jest.spyOn(workbook, 'getWorksheet')
          await sut.saveToBuffer(setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(getWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should call removeWorksheet with correct value if getWorksheet return any sheet', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'getWorksheet').mockReturnValue(sheet)
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const removeWorksheetSpy = jest.spyOn(workbook, 'removeWorksheet')
          await sut.saveToBuffer(setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(removeWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should not call removeWorksheet if getWorksheet return undefined', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'getWorksheet').mockReturnValue(undefined)
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const removeWorksheetSpy = jest.spyOn(workbook, 'removeWorksheet')
          await sut.saveToBuffer(setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(removeWorksheetSpy).not.toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })
      })

      describe('Add new Worksheet', () => {
        test('Should call addWorksheet with correct value', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
          await sut.saveToBuffer(setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(addWorksheetSpy).toHaveBeenCalledWith(setWorksheetDataDTO.name)
          })
        })

        test('Should call addWorksheet with correct value', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const setSheetDataSpy = jest.spyOn(sut, 'setWorksheetData')
          await sut.saveToBuffer(setWorksheetDataDTOList)
          setWorksheetDataDTOList.forEach(setWorksheetDataDTO => {
            expect(setSheetDataSpy).toHaveBeenCalledWith(sheet, setWorksheetDataDTO)
          })
        })

        test('Should call protect with correct value if password is provided', async () => {
          const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
          jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
          const dtoWithPassword = setWorksheetDataDTOList.map(setWorksheetDataDTO => ({
            ...setWorksheetDataDTO,
            password: internet.password()
          }))
          const protectSpy = jest.spyOn(sheet, 'protect')
          await sut.saveToBuffer(dtoWithPassword)
          dtoWithPassword.forEach(setWorksheetDataDTO => {
            expect(protectSpy).toHaveBeenCalledWith(setWorksheetDataDTO.password, {
              deleteColumns: false,
              deleteRows: false
            })
          })
        })
      })
    })

    describe('SheetData is not provided', () => {
      test('Should not call addWorksheet', async () => {
        const { sut, workbook } = makeSut()
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        await sut.saveToBuffer(undefined)
        expect(addWorksheetSpy).not.toHaveBeenCalled()
      })
    })

    describe('Save to file', () => {
      test('Should call WriteToBuffer with correct value', async () => {
        const { sut, sheet, workbook, setWorksheetDataDTOList } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const writeBufferSpy = jest.spyOn(workbook.xlsx, 'writeBuffer')
        await sut.saveToBuffer(setWorksheetDataDTOList)
        expect(writeBufferSpy).toHaveBeenCalledWith()
      })
    })
  })
})
