import { Excel4NodeAdapter } from './excel4node.adapter'
import {
  Excel4NodeWorkbookSpy,
  Excel4NodeWorksheetSpy,
  Excel4NodeColumnSpy,
  Excel4NodeCellSpy,
  Excel4NodeColumnDataModel,
  Excel4NodeColumnHeaderModel,
  mockExcel4NodeColumnHeaderModel,
  mockExcel4NodeColumnDataModel,
  ColumnHeaderStyles,
  Excel4NodeRowSpy
} from '@/infrastructure/excel'
import {
  SetWorksheetDataDTO,
  mockSetWorksheetDataDTO,
  mockExcelColumnHeaderModel,
  mockWorksheetHeaderModel
} from '@/protocols/excel'
import { Worksheet, Workbook } from 'excel4node'
import { datatype, system } from 'faker'

let sheet: Worksheet
let workbook: Workbook

jest.mock('excel4node', () => ({
  Worksheet: jest.fn().mockImplementation(() => sheet),
  Workbook: jest.fn().mockImplementation(() => workbook)
}))

type sutTypes = {
  sut: Excel4NodeAdapter
  sheet: Worksheet
  workbook: Workbook
  dto: SetWorksheetDataDTO<Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel>
  SetWorksheetDataDTOs: Array<SetWorksheetDataDTO<Excel4NodeColumnHeaderModel, Excel4NodeColumnDataModel>>
}

const makeSut = (): sutTypes => {
  const sut = new Excel4NodeAdapter()
  sheet = new Excel4NodeWorksheetSpy()
  workbook = new Excel4NodeWorkbookSpy()
  return {
    sut,
    sheet,
    workbook,
    dto: mockSetWorksheetDataDTO(),
    SetWorksheetDataDTOs: [
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO(),
      mockSetWorksheetDataDTO()
    ]
  }
}

describe('Excel4NodeAdapter', () => {
  describe('SetWorksheetHeader Method', () => {
    describe('WorksheetHeader is provided', () => {
      describe('Add Logo in Sheet', () => {
        describe('LogoPath is provided', () => {
          test('Should change width of column 1', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const columnSpy = jest.spyOn(sheet, 'column')
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(columnSpy).toHaveBeenCalledWith(1)
            expect(setWidthSpy).toHaveBeenCalledWith(12)
          })

          test('Should group first 5 rows', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            const stringSpy = jest.spyOn(cell, 'string')
            sut.setWorksheetData(sheet, dto)
            expect(cellSpy).toHaveBeenCalledWith(1, 1, 5, 1, true)
            expect(stringSpy).toHaveBeenCalledWith('')
          })

          test('Should call addImage with correct values', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            const addImageSpy = jest.spyOn(sheet, 'addImage')
            sut.setWorksheetData(sheet, dto)
            expect(addImageSpy).toHaveBeenCalledWith({
              path: dto.worksheetHeader.logoPath,
              type: 'picture',
              position: {
                type: 'absoluteAnchor',
                x: '0in',
                y: '0in'
              }
            })
          })
        })

        describe('LogoPath is not provided', () => {
          test('Should not call addImage', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            const addImageSpy = jest.spyOn(sheet, 'addImage')
            sut.setWorksheetData(sheet, dto)
            expect(addImageSpy).not.toHaveBeenCalled()
          })
        })
      })

      describe('Add Headers is Sheet', () => {
        describe('Headers is provided', () => {
          test('Should call Cell with correct values for each headers is logoPath is provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            const stringSpy = jest.spyOn(cell, 'string')
            sut.setWorksheetData(sheet, dto)
            let sheetHeaderLine = 1
            const startHeaderColumn = 2
            dto.worksheetHeader.headers.forEach(header => {
              expect(cellSpy).toHaveBeenCalledWith(sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7, true)
              expect(stringSpy).toHaveBeenCalledWith(header)
              sheetHeaderLine++
            })
          })

          test('Should call Cell with correct values for each headers is logoPath is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            const stringSpy = jest.spyOn(cell, 'string')
            sut.setWorksheetData(sheet, dto)
            let sheetHeaderLine = 1
            const startHeaderColumn = 1
            dto.worksheetHeader.headers.forEach(header => {
              expect(cellSpy).toHaveBeenCalledWith(sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7, true)
              expect(stringSpy).toHaveBeenCalledWith(header)
              sheetHeaderLine++
            })
          })
        })

        describe('Headers is not provided', () => {
          test('Should call Cell for each subHeaders if logoPath is provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.headers
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            sut.setWorksheetData(sheet, dto)
            expect(cellSpy).toHaveBeenCalledTimes(1 + dto.worksheetHeader.subHeaders.length)
          })

          test('Should call Cell for each subHeaders if logoPath is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            delete dto.worksheetHeader.headers
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            sut.setWorksheetData(sheet, dto)
            expect(cellSpy).toHaveBeenCalledTimes(dto.worksheetHeader.subHeaders.length)
          })
        })
      })

      describe('Add SubHeaders is Sheet', () => {
        describe('SubHeaders is provided', () => {
          test('Should call Cell with correct values for each subHeaders is logoPath is provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            const stringSpy = jest.spyOn(cell, 'string')
            sut.setWorksheetData(sheet, dto)
            let sheetHeaderLine = dto.worksheetHeader.headers.length
            const startHeaderColumn = 2
            dto.worksheetHeader.subHeaders.forEach(header => {
              expect(cellSpy).toHaveBeenCalledWith(sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7, true)
              expect(stringSpy).toHaveBeenCalledWith(header)
              sheetHeaderLine++
            })
          })

          test('Should call Cell with correct values for each subHeaders is logoPath is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            const stringSpy = jest.spyOn(cell, 'string')
            sut.setWorksheetData(sheet, dto)
            let sheetHeaderLine = dto.worksheetHeader.headers.length
            const startHeaderColumn = 1
            dto.worksheetHeader.subHeaders.forEach(header => {
              expect(cellSpy).toHaveBeenCalledWith(sheetHeaderLine, startHeaderColumn, sheetHeaderLine, startHeaderColumn + 7, true)
              expect(stringSpy).toHaveBeenCalledWith(header)
              sheetHeaderLine++
            })
          })
        })

        describe('SubHeaders is not provided', () => {
          test('Should call Cell for each headers if logoPath is provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.subHeaders
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            sut.setWorksheetData(sheet, dto)
            expect(cellSpy).toHaveBeenCalledTimes(1 + dto.worksheetHeader.headers.length)
          })

          test('Should call Cell for each headers if logoPath is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            delete dto.worksheetHeader.subHeaders
            const cell = new Excel4NodeCellSpy()
            jest.spyOn(sheet, 'cell').mockReturnValue(cell)
            const cellSpy = jest.spyOn(sheet, 'cell')
            sut.setWorksheetData(sheet, dto)
            expect(cellSpy).toHaveBeenCalledTimes(dto.worksheetHeader.headers.length)
          })
        })
      })
    })

    describe('SheetHeader is not provided', () => {
      test('Should not call addImage', () => {
        const { sut, dto, sheet } = makeSut()
        delete dto.worksheetHeader
        const addImageSpy = jest.spyOn(sheet, 'addImage')
        sut.setWorksheetData(sheet, dto)
        expect(addImageSpy).not.toHaveBeenCalled()
      })

      test('Should not call cell', () => {
        const { sut, dto, sheet } = makeSut()
        delete dto.worksheetHeader
        const cellSpy = jest.spyOn(sheet, 'cell')
        sut.setWorksheetData(sheet, dto)
        expect(cellSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('SetColumnHeader Method', () => {
    describe('SetWidth', () => {
      describe('First Column', () => {
        describe('LogoPath is provided', () => {
          test('Should call setWidth if width is small then 12', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            dto.columnHeaders = [mockExcelColumnHeaderModel()]
            dto.columnHeaders[0].width = datatype.number({ min: 1, max: 11 })
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(setWidthSpy).toHaveBeenCalledWith(12)
          })

          test('Should call setWidth if width is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            dto.columnHeaders = [mockExcelColumnHeaderModel()]
            delete dto.columnHeaders[0].width
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(setWidthSpy).toHaveBeenCalledWith(12)
          })

          test('Should call setWidth if width is bigger then 12', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            dto.columnHeaders = [mockExcelColumnHeaderModel()]
            dto.columnHeaders[0].width = datatype.number({ min: 13 })
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(setWidthSpy).toHaveBeenCalledWith(dto.columnHeaders[0].width)
          })
        })

        describe('LogoPath is not provided', () => {
          test('Should call setWidth if width is provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            dto.columnHeaders = [mockExcelColumnHeaderModel()]
            dto.columnHeaders[0].width = datatype.number()
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(setWidthSpy).toHaveBeenCalledWith(dto.columnHeaders[0].width)
          })

          test('Should call setWidth if width is not provided', () => {
            const { sut, dto, sheet } = makeSut()
            dto.worksheetHeader = mockWorksheetHeaderModel()
            delete dto.worksheetHeader.logoPath
            dto.columnHeaders = [mockExcelColumnHeaderModel()]
            delete dto.columnHeaders[0].width
            const column = new Excel4NodeColumnSpy()
            jest.spyOn(sheet, 'column').mockReturnValue(column)
            const setWidthSpy = jest.spyOn(column, 'setWidth')
            sut.setWorksheetData(sheet, dto)
            expect(setWidthSpy).toHaveBeenCalledWith(10)
          })
        })
      })

      describe('Others Columns', () => {
        test('Should call setWidth if width is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = mockWorksheetHeaderModel()
          dto.columnHeaders = [
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel()
          ]
          dto.columnHeaders.map(item => delete item.width)
          const column = new Excel4NodeColumnSpy()
          jest.spyOn(sheet, 'column').mockReturnValue(column)
          const setWidthSpy = jest.spyOn(column, 'setWidth')
          sut.setWorksheetData(sheet, dto)
          dto.columnHeaders.forEach((column, index) => {
            if (index > 0) {
              expect(setWidthSpy).toHaveBeenCalledWith(10)
            }
          })
        })

        test('Should call setWidth if width is not provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = mockWorksheetHeaderModel()
          dto.columnHeaders = [
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel()
          ]
          const column = new Excel4NodeColumnSpy()
          jest.spyOn(sheet, 'column').mockReturnValue(column)
          const setWidthSpy = jest.spyOn(column, 'setWidth')
          sut.setWorksheetData(sheet, dto)
          dto.columnHeaders.forEach((column, index) => {
            if (index > 0) {
              expect(setWidthSpy).toHaveBeenCalledWith(column.width)
            }
          })
        })
      })
    })

    describe('Header', () => {
      describe('SheetHeader is provided', () => {
        test('Should call cell with correct value for each column header provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = mockWorksheetHeaderModel()
          dto.columnHeaders = [
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel()
          ]
          const columnHeaderLine = dto.worksheetHeader.headers.length + dto.worksheetHeader.subHeaders.length + 1
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          dto.columnHeaders.forEach((column, columnIndex) => {
            expect(cellSpy).toHaveBeenCalledWith(columnHeaderLine, columnIndex + 1)
            expect(stringSpy).toHaveBeenCalledWith(column.header)
          })
        })
      })

      describe('SheetHeader is empty', () => {
        test('Should call cell with correct value for each column header provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = {
            headers: [],
            subHeaders: []
          }
          dto.columnHeaders = [
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel()
          ]
          const columnHeaderLine = 1
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          dto.columnHeaders.forEach((column, columnIndex) => {
            expect(cellSpy).toHaveBeenCalledWith(columnHeaderLine, columnIndex + 1)
            expect(stringSpy).toHaveBeenCalledWith(column.header)
          })
        })
      })

      describe('SheetHeader is not provided', () => {
        test('Should call cell with correct value for each column header provided', () => {
          const { sut, dto, sheet } = makeSut()
          delete dto.worksheetHeader
          dto.columnHeaders = [
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel(),
            mockExcelColumnHeaderModel()
          ]
          const columnHeaderLine = 1
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          dto.columnHeaders.forEach((column, columnIndex) => {
            expect(cellSpy).toHaveBeenCalledWith(columnHeaderLine, columnIndex + 1)
            expect(stringSpy).toHaveBeenCalledWith(column.header)
          })
        })
      })
    })

    describe('Style', () => {
      test('Should call style with correct value for each column header provided if style is provided', () => {
        const { sut, dto, sheet } = makeSut()
        delete dto.worksheetHeader
        dto.columnHeaders = [
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel()
        ]
        const cell = new Excel4NodeCellSpy()
        jest.spyOn(sheet, 'cell').mockReturnValue(cell)
        const styleSpy = jest.spyOn(cell, 'style')
        sut.setWorksheetData(sheet, dto)
        dto.columnHeaders.forEach(column => {
          expect(styleSpy).toHaveBeenCalledWith(column.style)
        })
      })

      test('Should call style with correct value for each column header provided if style is not provided', () => {
        const { sut, dto, sheet } = makeSut()
        delete dto.worksheetHeader
        dto.columnHeaders = [
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel(),
          mockExcel4NodeColumnHeaderModel()
        ]
        dto.columnHeaders.map(item => delete item.style)
        const cell = new Excel4NodeCellSpy()
        jest.spyOn(sheet, 'cell').mockReturnValue(cell)
        const styleSpy = jest.spyOn(cell, 'style')
        sut.setWorksheetData(sheet, dto)
        dto.columnHeaders.forEach(column => {
          expect(styleSpy).toHaveBeenCalledWith(ColumnHeaderStyles)
        })
      })
    })
  })

  describe('setWorksheetData Method', () => {
    describe('Freeze Header line', () => {
      test('Should call Freeze with correct value if sheetHeader is provided', () => {
        const { sut, sheet, dto } = makeSut()
        dto.worksheetHeader = mockWorksheetHeaderModel()
        const row = new Excel4NodeRowSpy()
        jest.spyOn(sheet, 'row').mockReturnValue(row)
        const rowSpy = jest.spyOn(sheet, 'row')
        const freezeSpy = jest.spyOn(row, 'freeze')
        sut.setWorksheetData(sheet, dto)
        expect(rowSpy).toHaveBeenCalledWith(dto.worksheetHeader.headers.length + dto.worksheetHeader.subHeaders.length + 1)
        expect(freezeSpy).toHaveBeenCalled()
      })
    })

    describe('Set Content Data', () => {
      describe('Content', () => {
        test('Should call Cell with correct values for each data content if sheetHeader is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = mockWorksheetHeaderModel()
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          let contentLine = dto.worksheetHeader.headers.length + dto.worksheetHeader.subHeaders.length + 1
          dto.columnData.forEach((row) => {
            row.forEach((column, columnIndex) => {
              expect(cellSpy).toHaveBeenCalledWith(contentLine, columnIndex + 1)
              expect(stringSpy).toHaveBeenCalledWith(column.content)
              contentLine++
            })
          })
        })

        test('Should call Cell with correct values for each data content if sheetHeader is not provided', () => {
          const { sut, dto, sheet } = makeSut()
          delete dto.worksheetHeader
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          let contentLine = 1
          dto.columnData.forEach((row) => {
            row.forEach((column, columnIndex) => {
              expect(cellSpy).toHaveBeenCalledWith(contentLine, columnIndex + 1)
              expect(stringSpy).toHaveBeenCalledWith(column.content)
              contentLine++
            })
          })
        })

        test('Should call Cell with correct values for each data content if sheetHeader is empty', () => {
          const { sut, dto, sheet } = makeSut()
          dto.worksheetHeader = {
            headers: [],
            subHeaders: []
          }
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const cellSpy = jest.spyOn(sheet, 'cell')
          const stringSpy = jest.spyOn(cell, 'string')
          sut.setWorksheetData(sheet, dto)
          let contentLine = 1
          dto.columnData.forEach((row) => {
            row.forEach((column, columnIndex) => {
              expect(cellSpy).toHaveBeenCalledWith(contentLine, columnIndex + 1)
              expect(stringSpy).toHaveBeenCalledWith(column.content)
              contentLine++
            })
          })
        })
      })

      describe('Style', () => {
        test('Should call Style with correct values for each data content if style is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.columnData = [[
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ],
          [
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ]
          ]
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const styleSpy = jest.spyOn(cell, 'style')
          sut.setWorksheetData(sheet, dto)
          dto.columnData.forEach((row) => {
            row.forEach(column => {
              expect(styleSpy).toHaveBeenCalledWith(column.style)
            })
          })
        })

        test('Should not call Style if style is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.columnData = [[
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ],
          [
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ]
          ]
          dto.columnData.map((row, index) => (index > 0) && row.map(column => delete column.style))
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const styleSpy = jest.spyOn(cell, 'style')
          sut.setWorksheetData(sheet, dto)
          dto.columnData.forEach((row) => {
            row.forEach(column => {
              if (column.style) {
                expect(styleSpy).toHaveBeenCalledWith(column.style)
              } else {
                expect(styleSpy).not.toHaveBeenCalledWith(undefined)
              }
            })
          })
        })
      })

      describe('Comment', () => {
        test('Should call Comment with correct values for each data content if comment is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.columnData = [[
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ],
          [
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ]
          ]
          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const commentSpy = jest.spyOn(cell, 'comment')
          sut.setWorksheetData(sheet, dto)
          dto.columnData.forEach((row) => {
            row.forEach(column => {
              expect(commentSpy).toHaveBeenCalledWith(column.comment)
            })
          })
        })

        test('Should not call Comment if comment is provided', () => {
          const { sut, dto, sheet } = makeSut()
          dto.columnData = [[
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ],
          [
            mockExcel4NodeColumnDataModel(),
            mockExcel4NodeColumnDataModel()
          ]
          ]
          dto.columnData.map((row, index) => (index > 0) && row.map(column => delete column.comment))

          const cell = new Excel4NodeCellSpy()
          jest.spyOn(sheet, 'cell').mockReturnValue(cell)
          const commentSpy = jest.spyOn(cell, 'comment')
          sut.setWorksheetData(sheet, dto)
          dto.columnData.forEach((row) => {
            row.forEach(column => {
              if (column.comment) {
                expect(commentSpy).toHaveBeenCalledWith(column.comment)
              } else {
                expect(commentSpy).not.toHaveBeenCalledWith(undefined)
              }
            })
          })
        })
      })
    })
  })

  describe('SaveToFile Method', () => {
    describe('SheetData is provided', () => {
      test('Should call addWorksheet with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        sut.saveToFile(system.filePath(), SetWorksheetDataDTOs)
        SetWorksheetDataDTOs.forEach(SetWorksheetDataDTO => {
          expect(addWorksheetSpy).toHaveBeenCalledWith(SetWorksheetDataDTO.name)
        })
      })

      test('Should call addWorksheet with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const setWorksheetDataSpy = jest.spyOn(sut, 'setWorksheetData')
        sut.saveToFile(system.filePath(), SetWorksheetDataDTOs)
        SetWorksheetDataDTOs.forEach(SetWorksheetDataDTO => {
          expect(setWorksheetDataSpy).toHaveBeenCalledWith(sheet, SetWorksheetDataDTO)
        })
      })
    })

    describe('SheetData is not provided', () => {
      test('Should not call addWorksheet', () => {
        const { sut, workbook } = makeSut()
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        sut.saveToFile(system.filePath(), undefined)
        expect(addWorksheetSpy).not.toHaveBeenCalled()
      })
    })

    describe('Save to file', () => {
      test('Should call Write with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const filePath = system.filePath()
        const writeSpy = jest.spyOn(workbook, 'write')
        sut.saveToFile(filePath, SetWorksheetDataDTOs)
        expect(writeSpy).toHaveBeenCalledWith(filePath)
      })
    })
  })

  describe('SaveToBuffer Method', () => {
    describe('SheetData is provided', () => {
      test('Should call addWorksheet with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        sut.saveToBuffer(SetWorksheetDataDTOs)
        SetWorksheetDataDTOs.forEach(SetWorksheetDataDTO => {
          expect(addWorksheetSpy).toHaveBeenCalledWith(SetWorksheetDataDTO.name)
        })
      })

      test('Should call addWorksheet with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const setWorksheetDataSpy = jest.spyOn(sut, 'setWorksheetData')
        sut.saveToBuffer(SetWorksheetDataDTOs)
        SetWorksheetDataDTOs.forEach(SetWorksheetDataDTO => {
          expect(setWorksheetDataSpy).toHaveBeenCalledWith(sheet, SetWorksheetDataDTO)
        })
      })
    })

    describe('SheetData is not provided', () => {
      test('Should not call addWorksheet', () => {
        const { sut, workbook } = makeSut()
        const addWorksheetSpy = jest.spyOn(workbook, 'addWorksheet')
        sut.saveToBuffer(undefined)
        expect(addWorksheetSpy).not.toHaveBeenCalled()
      })
    })

    describe('Save to file', () => {
      test('Should call WriteToBuffer with correct value', () => {
        const { sut, sheet, workbook, SetWorksheetDataDTOs } = makeSut()
        jest.spyOn(workbook, 'addWorksheet').mockReturnValue(sheet)
        const writeToBufferSpy = jest.spyOn(workbook, 'writeToBuffer')
        sut.saveToBuffer(SetWorksheetDataDTOs)
        expect(writeToBufferSpy).toHaveBeenCalledWith()
      })
    })
  })
})
