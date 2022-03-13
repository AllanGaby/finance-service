import { ExcelJSAdapter } from './exceljs.adapter'
import { ExportToCSVFileDTO, mockExportToCSVFileDTO } from '@/protocols/csv'
import { SheetSpy } from '@/infrastructure/csv/exceljs/mocks'

type sutTypes = {
  sut: ExcelJSAdapter
  request: ExportToCSVFileDTO
}

const makeSut = (): sutTypes => {
  const sut = new ExcelJSAdapter()
  jest.spyOn(sut.workbook.csv, 'writeFile').mockImplementationOnce((path: string) => { return undefined })
  jest.spyOn(sut.workbook.xlsx, 'writeFile').mockImplementationOnce((path: string) => { return undefined })
  return {
    sut,
    request: mockExportToCSVFileDTO()
  }
}

describe('ExcelJSAdapter', () => {
  describe('ExportToCSV Method', () => {
    test('Should call AddWorksheet with correct values', async () => {
      const { sut, request } = makeSut()
      const addWorksheetSpy = jest.spyOn(sut.workbook, 'addWorksheet')
      await sut.exportToCSV(request)
      expect(addWorksheetSpy).toHaveBeenCalledWith('default')
    })

    test('Should call addRows with correct values', async () => {
      const { sut, request } = makeSut()
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToCSV(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call addRows with correct values without columns', async () => {
      const { sut, request } = makeSut()
      delete request.columns
      const sheetSpy = new SheetSpy()
      jest.spyOn(sut.workbook, 'addWorksheet').mockImplementationOnce((name: string): any => { return sheetSpy })
      const addRowsSpy = jest.spyOn(sheetSpy, 'addRows')
      await sut.exportToCSV(request)
      expect(addRowsSpy).toHaveBeenCalledWith(request.data)
    })

    test('Should call WriteBuffer with correct values', async () => {
      const { sut, request } = makeSut()
      const writeFileSpy = jest.spyOn(sut.workbook.csv, 'writeBuffer')
      await sut.exportToCSV(request)
      expect(writeFileSpy).toHaveBeenCalledWith({
        encoding: 'utf-8',
        includeEmptyRows: false
      })
    })
  })
})
