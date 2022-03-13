import { XlsxAdapter } from './xlsx.adapter'
import { FileContentModel } from '@/protocols/excel'
import { XlsxWorkBookSpy } from '@/infrastructure/excel'
import { database, datatype, random } from 'faker'
import XLSX, { WorkSheet } from 'xlsx'

jest.mock('xlsx')

type sutTypes = {
  sut: XlsxAdapter
  content: Buffer
}

const makeSut = (): sutTypes => ({
  sut: new XlsxAdapter(),
  content: Buffer.from(datatype.string())
})

const mockObject = (): Object => ({
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid(),
  [database.column()]: datatype.uuid()
})

describe('XlsxAdapter', () => {
  describe('GetContentByBuffer Method', () => {
    test('Should read content file provided', () => {
      const { sut, content } = makeSut()
      const readSpy = jest.spyOn(XLSX, 'read')
      sut.getContentByBuffer(content)
      expect(readSpy).toHaveBeenCalledWith(content)
    })
  })

  describe('Process content file', () => {
    test('Should call sheet_to_json with for each sheet', () => {
      const { sut, content } = makeSut()
      const workBook = new XlsxWorkBookSpy()
      workBook.SheetNames = [datatype.uuid(), datatype.uuid(), datatype.uuid(), datatype.uuid()]
      workBook.Sheets = {}
      workBook.SheetNames.forEach(sheetName => {
        workBook.Sheets[sheetName] = random.objectElement<WorkSheet>()
      })
      jest.spyOn(XLSX, 'read').mockReturnValueOnce(workBook)
      jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValue([])
      const sheetToJsonSpy = jest.spyOn(XLSX.utils, 'sheet_to_json')
      sut.getContentByBuffer(content)
      workBook.SheetNames.forEach(sheetName => {
        const sheet = workBook.Sheets[sheetName]
        expect(sheetToJsonSpy).toHaveBeenCalledWith(sheet, { blankrows: false, defval: '' })
      })
    })
  })

  describe('Return correct value', () => {
    test('Should return undefined if xlsx return undefined', () => {
      const { sut, content } = makeSut()
      jest.spyOn(XLSX, 'read').mockReturnValueOnce(undefined)
      const response = sut.getContentByBuffer(content)
      expect(response).toBeFalsy()
    })

    test('Should return empty object if file hasnt sheets', () => {
      const { sut, content } = makeSut()
      const workBook = new XlsxWorkBookSpy()
      workBook.SheetNames = []
      jest.spyOn(XLSX, 'read').mockReturnValueOnce(workBook)
      const response = sut.getContentByBuffer(content)
      expect(response).toEqual({})
    })

    test('Should return a full object if file has any sheets', () => {
      const { sut, content } = makeSut()
      const expectedResponse: FileContentModel = {}
      const workBook = new XlsxWorkBookSpy()
      workBook.SheetNames = [datatype.uuid(), datatype.uuid(), datatype.uuid(), datatype.uuid()]
      workBook.Sheets = {}
      workBook.SheetNames.forEach(sheetName => {
        const content: object[] = [
          mockObject(),
          mockObject(),
          mockObject()
        ]
        workBook.Sheets[sheetName] = random.objectElement<WorkSheet>()
        expectedResponse[sheetName] = content.map(item => Object.values(item))
        jest.spyOn(XLSX.utils, 'sheet_to_json').mockReturnValueOnce(content)
      })
      jest.spyOn(XLSX, 'read').mockReturnValueOnce(workBook)
      const response = sut.getContentByBuffer(content)
      expect(response).toEqual(expectedResponse)
    })
  })
})
