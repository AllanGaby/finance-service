import { MemoryExportEntitiesToXLSXFileUseCase } from './memory-export-entities-to-xlsx-file.use-case'
import {
  EntityColumnsToExportXLSXFileDTO,
  EntityModel,
  ExportEntitiesToXLSXFileDTO,
  mockEntityModel,
  mockEntityModelColumnsToExportXLSXFileDTO,
  mockExportEntitiesToXLSXFileDTO
} from '@/domain/common'
import { SaveToBufferProtocolSpy, ExcelColumnHeaderModel, ExcelColumnDataModel } from '@/protocols/excel'
import { InvalidColumnsError } from '@/data/common//errors'
import { database, datatype, random, system } from 'faker'

type sutTypes = {
  sut: MemoryExportEntitiesToXLSXFileUseCase<EntityModel>
  exportEntitiesToXLSXFileDTO: ExportEntitiesToXLSXFileDTO<EntityModel>
  validColumnsToExport: EntityColumnsToExportXLSXFileDTO
  exportToXLSXAdapter: SaveToBufferProtocolSpy
  logoFilePath: string
  entityName: string
}

const makeSut = (validColumnsToExport: EntityColumnsToExportXLSXFileDTO = mockEntityModelColumnsToExportXLSXFileDTO()): sutTypes => {
  const exportEntitiesToXLSXFileDTO = mockExportEntitiesToXLSXFileDTO<EntityModel>([
    mockEntityModel(),
    mockEntityModel(),
    mockEntityModel()
  ])
  const exportToXLSXAdapter = new SaveToBufferProtocolSpy()
  const entityName = database.column()
  const logoFilePath = system.filePath()
  const sut = new MemoryExportEntitiesToXLSXFileUseCase<EntityModel>(
    validColumnsToExport,
    exportToXLSXAdapter,
    logoFilePath,
    entityName
  )
  return {
    sut,
    exportEntitiesToXLSXFileDTO,
    validColumnsToExport,
    exportToXLSXAdapter,
    logoFilePath,
    entityName
  }
}

describe('MemoryExportEntitiesToXLSXFileUseCase', () => {
  describe('Valid columns', () => {
    test('Should return InvalidColumnsError if columns is empty list', async () => {
      const { sut, exportEntitiesToXLSXFileDTO } = makeSut()
      exportEntitiesToXLSXFileDTO.columns = []
      const promise = sut.exportToFile(exportEntitiesToXLSXFileDTO)
      await expect(promise).rejects.toThrowError(InvalidColumnsError)
    })

    test('Should return InvalidColumnsError if columns is provided are invalid', async () => {
      const { sut, exportEntitiesToXLSXFileDTO } = makeSut()
      exportEntitiesToXLSXFileDTO.columns = [datatype.uuid(), datatype.uuid(), datatype.uuid()]
      const promise = sut.exportToFile(exportEntitiesToXLSXFileDTO)
      await expect(promise).rejects.toThrowError(InvalidColumnsError)
    })

    test('Should not return InvalidColumnsError is columns provided are valid', async () => {
      const { sut, exportEntitiesToXLSXFileDTO } = makeSut()
      const entity = mockEntityModel()
      exportEntitiesToXLSXFileDTO.columns = Object.keys(entity)
      await sut.exportToFile(exportEntitiesToXLSXFileDTO)
    })
  })

  describe('Export Entities to File', () => {
    test('Should call ExportToXLSXAdapter with correct values', async () => {
      const validColumns = mockEntityModelColumnsToExportXLSXFileDTO()
      const entities = mockEntityModel()
      const columns = random.arrayElements<string>(Object.keys(entities), datatype.number({ min: 1, max: 3 }))
      const columnsToExport: ExcelColumnHeaderModel[] = []
      const entityKeys = Object.keys(validColumns)
      columns.forEach(column => {
        if (entityKeys.includes(column)) {
          columnsToExport.push(validColumns[column])
        }
      })
      const { sut, exportEntitiesToXLSXFileDTO, exportToXLSXAdapter, entityName, logoFilePath } = makeSut(validColumns)
      const columnData: ExcelColumnDataModel[][] = []
      exportEntitiesToXLSXFileDTO.data.forEach(entity => {
        const row: ExcelColumnDataModel[] = []
        columnsToExport.forEach(column => {
          row.push({
            content: entity[column.header]
          })
        })
        columnData.push(row)
      })
      exportEntitiesToXLSXFileDTO.columns = columns
      const exportToXLSXSpy = jest.spyOn(exportToXLSXAdapter, 'saveToBuffer')
      await sut.exportToFile(exportEntitiesToXLSXFileDTO)
      expect(exportToXLSXSpy).toHaveBeenCalledWith([{
        name: entityName,
        worksheetHeader: {
          logoPath: logoFilePath
        },
        columnHeaders: columnsToExport,
        columnData
      }])
    })
  })
})
