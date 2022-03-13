import { DbListEntitiesAndExportToFileUseCase } from './db-list-entities-and-export-to-file.use-case'
import { ExportEntitiesToFileUseCase, ListEntitiesUseCase, EntityModel, ListEntitiesAndExportToFileDTO, mockListEntitiesAndExportToFileDTO, ListEntitiesUseCaseSpy, ExportEntitiesToFileUseCaseSpy, mockEntityModel, ListEntityModel, mockListEntityModel } from '@/domain/common'

type sutTypes = {
  sut: DbListEntitiesAndExportToFileUseCase<EntityModel>
  listEntitiesAndExportToFileDTO: ListEntitiesAndExportToFileDTO
  exportEntitiesToFileUseCase: ExportEntitiesToFileUseCase<EntityModel>
  listEntitiesUseCase: ListEntitiesUseCase<EntityModel>
}

const makeSut = (data: ListEntityModel<EntityModel> = mockListEntityModel<EntityModel>([
  mockEntityModel(),
  mockEntityModel(),
  mockEntityModel()
])): sutTypes => {
  const exportEntitiesToFileUseCase = new ExportEntitiesToFileUseCaseSpy<EntityModel>()
  const listEntitiesUseCase = new ListEntitiesUseCaseSpy<EntityModel>()
  jest.spyOn(listEntitiesUseCase, 'list').mockResolvedValue(data)
  const sut = new DbListEntitiesAndExportToFileUseCase<EntityModel>(
    exportEntitiesToFileUseCase,
    listEntitiesUseCase
  )
  return {
    sut,
    listEntitiesAndExportToFileDTO: mockListEntitiesAndExportToFileDTO(),
    exportEntitiesToFileUseCase,
    listEntitiesUseCase
  }
}

describe('DbListEntitiesAndExportToFileUseCase', () => {
  describe('Search entities', () => {
    test('Should call ListEntitiesUseCase with correct values', async () => {
      const { sut, listEntitiesAndExportToFileDTO, listEntitiesUseCase } = makeSut()
      const { columns, ...filters } = listEntitiesAndExportToFileDTO
      filters.page = 1
      filters.recordsPerPage = 999999999
      const listSpy = jest.spyOn(listEntitiesUseCase, 'list')
      await sut.listAndExport(listEntitiesAndExportToFileDTO)
      expect(listSpy).toHaveBeenCalledWith(filters)
    })
  })

  describe('Export entities to file', () => {
    test('Should call ExportEntitiesToFileUseCase to correct values', async () => {
      const data = mockListEntityModel<EntityModel>([
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel(),
        mockEntityModel()
      ])
      const { sut, listEntitiesAndExportToFileDTO, exportEntitiesToFileUseCase } = makeSut(data)
      const exportToFileSpy = jest.spyOn(exportEntitiesToFileUseCase, 'exportToFile')
      await sut.listAndExport(listEntitiesAndExportToFileDTO)
      expect(exportToFileSpy).toHaveBeenCalledWith({
        columns: listEntitiesAndExportToFileDTO.columns,
        data: data.data
      })
    })
  })
})
