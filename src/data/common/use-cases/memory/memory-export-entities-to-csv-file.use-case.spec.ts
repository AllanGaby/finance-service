import { MemoryExportEntitiesToFileUseCase } from './memory-export-entities-to-csv-file.use-case'
import {
  EntityColumnsToExportCSVFileDTO,
  EntityModel,
  ExportEntitiesToCSVFileDTO,
  mockEntityModel,
  mockEntityModelColumnsToExportDTO,
  mockExportEntitiesToCSVFileDTO
} from '@/domain/common'
import { ColumnToExportModel, ExportToCSVFileProtocolSpy } from '@/protocols/csv'
import { InvalidColumnsError } from '@/data/common//errors'
import { datatype, random, system } from 'faker'
import * as uuid from 'uuid'

jest.mock('uuid')

type sutTypes = {
  sut: MemoryExportEntitiesToFileUseCase<EntityModel>
  ExportEntitiesToCSVFileDTO: ExportEntitiesToCSVFileDTO<EntityModel>
  validColumnsToExport: EntityColumnsToExportCSVFileDTO
  exportToCSVAdapter: ExportToCSVFileProtocolSpy
  temporaryFileDir: string
}

const makeSut = (validColumnsToExport: EntityColumnsToExportCSVFileDTO = mockEntityModelColumnsToExportDTO()): sutTypes => {
  const ExportEntitiesToCSVFileDTO = mockExportEntitiesToCSVFileDTO<EntityModel>([
    mockEntityModel(),
    mockEntityModel(),
    mockEntityModel()
  ])
  const exportToCSVAdapter = new ExportToCSVFileProtocolSpy()
  const temporaryFileDir = system.filePath()
  const sut = new MemoryExportEntitiesToFileUseCase<EntityModel>(
    validColumnsToExport,
    exportToCSVAdapter,
    temporaryFileDir
  )
  return {
    sut,
    ExportEntitiesToCSVFileDTO,
    validColumnsToExport,
    exportToCSVAdapter,
    temporaryFileDir
  }
}

describe('MemoryExportEntitiesToFileUseCase', () => {
  describe('Valid columns', () => {
    test('Should return InvalidColumnsError if columns is empty list', async () => {
      const { sut, ExportEntitiesToCSVFileDTO } = makeSut()
      ExportEntitiesToCSVFileDTO.columns = []
      const promise = sut.exportToFile(ExportEntitiesToCSVFileDTO)
      await expect(promise).rejects.toThrowError(InvalidColumnsError)
    })

    test('Should return InvalidColumnsError if columns is provided are invalid', async () => {
      const { sut, ExportEntitiesToCSVFileDTO } = makeSut()
      ExportEntitiesToCSVFileDTO.columns = [datatype.uuid(), datatype.uuid(), datatype.uuid()]
      const promise = sut.exportToFile(ExportEntitiesToCSVFileDTO)
      await expect(promise).rejects.toThrowError(InvalidColumnsError)
    })

    test('Should not return InvalidColumnsError is columns provided are valid', async () => {
      const { sut, ExportEntitiesToCSVFileDTO } = makeSut()
      const entity = mockEntityModel()
      ExportEntitiesToCSVFileDTO.columns = Object.keys(entity)
      await sut.exportToFile(ExportEntitiesToCSVFileDTO)
    })
  })

  describe('Export Entities to File', () => {
    test('Should call ExportToCSVAdapter with correct values', async () => {
      const validColumns = mockEntityModelColumnsToExportDTO()
      const entities = mockEntityModel()
      const columns = random.arrayElements<string>(Object.keys(entities), datatype.number({ min: 1, max: 3 }))
      const columnsToExport: ColumnToExportModel[] = []
      const entityKeys = Object.keys(validColumns)
      columns.forEach(column => {
        if (entityKeys.includes(column)) {
          columnsToExport.push(validColumns[column])
        }
      })
      const destineFileName = datatype.uuid()
      jest.spyOn(uuid, 'v4').mockReturnValue(destineFileName)
      const { sut, ExportEntitiesToCSVFileDTO, exportToCSVAdapter, temporaryFileDir } = makeSut(validColumns)
      ExportEntitiesToCSVFileDTO.columns = columns
      const exportToCSVSpy = jest.spyOn(exportToCSVAdapter, 'exportToCSV')
      await sut.exportToFile(ExportEntitiesToCSVFileDTO)
      expect(exportToCSVSpy).toHaveBeenCalledWith({
        data: ExportEntitiesToCSVFileDTO.data,
        filePath: `${temporaryFileDir}/${destineFileName}.csv`,
        columns: columnsToExport
      })
    })
  })
})
