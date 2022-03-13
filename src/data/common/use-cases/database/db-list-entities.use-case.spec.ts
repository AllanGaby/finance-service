import { DbListEntitiesUseCase } from './db-list-entities.use-case'
import { mockListEntitiesDTO, OrderDirection, EntityModel, ListEntitiesDTO } from '@/domain/common'
import { CountEntitiesRepositorySpy, ListEntitiesRepositorySpy, mockRepositoryOptionsModel } from '@/protocols/repositories'
import { RepositoryOptionsModel } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbListEntitiesUseCase<EntityModel>
  request: ListEntitiesDTO
  skip: number
  pageSize: number
  countEntitiesRepository: CountEntitiesRepositorySpy<EntityModel>
  listEntitiesRepository: ListEntitiesRepositorySpy<EntityModel>
  options: RepositoryOptionsModel
}
const getSkip = (request: ListEntitiesDTO): number => {
  const { page, recordsPerPage } = request
  const pageSize = !recordsPerPage || recordsPerPage <= 0 ? 15 : recordsPerPage
  return page <= 1 ? 0 : (page - 1) * pageSize
}

const getPageSize = (request: ListEntitiesDTO): number => {
  const { recordsPerPage } = request
  return recordsPerPage <= 0 ? 15 : recordsPerPage
}

const makeSut = (options?: RepositoryOptionsModel): sutTypes => {
  const countEntitiesRepository = new CountEntitiesRepositorySpy()
  const listEntitiesRepository = new ListEntitiesRepositorySpy()
  const request = mockListEntitiesDTO()
  const skip = getSkip(request)
  const pageSize = getPageSize(request)
  const sut = new DbListEntitiesUseCase(countEntitiesRepository, listEntitiesRepository, options)
  return {
    sut,
    request,
    skip,
    pageSize,
    countEntitiesRepository,
    listEntitiesRepository,
    options
  }
}

describe('DbListEntitiesUseCase', () => {
  describe('Get RecordCount', () => {
    describe('Complete is provided', () => {
      test('Should call CountEntitiesRepository with correct value if options is not provided', async () => {
        const options = undefined
        const { sut, countEntitiesRepository, request } = makeSut(options)
        const countSpy = jest.spyOn(countEntitiesRepository, 'count')
        await sut.list(request)
        expect(countSpy).toHaveBeenCalledWith(request.textToSearch, request.filters, {
          returnDeletedEntities: false,
          returnCompleteData: request.complete
        })
      })

      test('Should call CountEntitiesRepository with correct value if options is provided', async () => {
        const options = mockRepositoryOptionsModel()
        const { sut, countEntitiesRepository, request } = makeSut(options)
        const countSpy = jest.spyOn(countEntitiesRepository, 'count')
        await sut.list(request)
        expect(countSpy).toHaveBeenCalledWith(request.textToSearch, request.filters, {
          returnDeletedEntities: options.returnDeletedEntities,
          returnCompleteData: request.complete
        })
      })
    })

    describe('Complete is not provided', () => {
      test('Should call CountEntitiesRepository with correct value if options is not provided', async () => {
        const options = undefined
        const { sut, countEntitiesRepository, request } = makeSut(options)
        const countSpy = jest.spyOn(countEntitiesRepository, 'count')
        delete request.complete
        await sut.list(request)
        expect(countSpy).toHaveBeenCalledWith(request.textToSearch, request.filters, {
          returnDeletedEntities: false,
          returnCompleteData: false
        })
      })

      test('Should call CountEntitiesRepository with correct value if options is provided', async () => {
        const options = mockRepositoryOptionsModel()
        const { sut, countEntitiesRepository, request } = makeSut(options)
        const countSpy = jest.spyOn(countEntitiesRepository, 'count')
        delete request.complete
        await sut.list(request)
        expect(countSpy).toHaveBeenCalledWith(request.textToSearch, request.filters, {
          returnDeletedEntities: options.returnDeletedEntities,
          returnCompleteData: false
        })
      })
    })

    test('Should fails if CountEntitiesRepository fails', async () => {
      const { sut, countEntitiesRepository, request } = makeSut()
      jest.spyOn(countEntitiesRepository, 'count').mockRejectedValue(new Error())
      const promise = sut.list(request)
      await expect(promise).rejects.toThrow()
    })

    test('Should not call ListEntitiesRepository if CountEntitiesRepository return 0', async () => {
      const { sut, countEntitiesRepository, listEntitiesRepository, request } = makeSut()
      jest.spyOn(countEntitiesRepository, 'count').mockResolvedValue(0)
      const listSpy = jest.spyOn(listEntitiesRepository, 'list')
      await sut.list(request)
      expect(listSpy).not.toHaveBeenCalled()
    })

    test('Should not call ListEntitiesRepository if CountEntitiesRepository fails', async () => {
      const { sut, countEntitiesRepository, listEntitiesRepository, request } = makeSut()
      jest.spyOn(countEntitiesRepository, 'count').mockRejectedValue(new Error())
      const listSpy = jest.spyOn(listEntitiesRepository, 'list')
      const promise = sut.list(request)
      await expect(promise).rejects.toThrow()
      expect(listSpy).not.toHaveBeenCalled()
    })
  })

  describe('Find Entities', () => {
    describe('Complete is provided', () => {
      test('Should call ListEntitiesRepository with correct value if options is not provided', async () => {
        const options = undefined
        const { sut, listEntitiesRepository, request, skip } = makeSut(options)
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        const { complete, ...filters } = request
        await sut.list(request)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip
        }, {
          returnDeletedEntities: false,
          returnCompleteData: complete
        })
      })

      test('Should call ListEntitiesRepository with correct value if options is provided', async () => {
        const options = mockRepositoryOptionsModel()
        const { sut, listEntitiesRepository, request, skip } = makeSut(options)
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        const { complete, ...filters } = request
        await sut.list(request)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip
        }, {
          returnDeletedEntities: options.returnDeletedEntities,
          returnCompleteData: complete
        })
      })
    })

    describe('Complete is not provided', () => {
      test('Should call ListEntitiesRepository with correct value if options is not provided', async () => {
        const options = undefined
        const { sut, listEntitiesRepository, request, skip } = makeSut(options)
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        delete request.complete
        await sut.list(request)
        delete request.page
        expect(listSpy).toHaveBeenCalledWith({
          ...request,
          skip
        }, {
          returnDeletedEntities: false,
          returnCompleteData: false
        })
      })

      test('Should call ListEntitiesRepository with correct value if options is provided', async () => {
        const options = mockRepositoryOptionsModel()
        const { sut, listEntitiesRepository, request, skip } = makeSut(options)
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        delete request.complete
        await sut.list(request)
        delete request.page
        expect(listSpy).toHaveBeenCalledWith({
          ...request,
          skip
        }, {
          returnDeletedEntities: options.returnDeletedEntities,
          returnCompleteData: false
        })
      })
    })

    describe('Page', () => {
      test('Should call ListEntitiesRepository with correct value to page 1', async () => {
        const { sut, listEntitiesRepository, request } = makeSut()
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        request.page = 1
        const { complete, ...filters } = request
        await sut.list(request)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip: 0
        }, expect.any(Object))
      })

      test('Should call ListEntitiesRepository with correct value to page 1', async () => {
        const { sut, listEntitiesRepository, request } = makeSut()
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        delete request.page
        const { complete, ...filters } = request
        await sut.list(request)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip: 0
        }, expect.any(Object))
      })
    })

    describe('RecordsPerPage', () => {
      test('Should call ListEntitiesRepository with correct if recordsPerPage is not provided', async () => {
        const { sut, listEntitiesRepository, request } = makeSut()
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        delete request.recordsPerPage
        const { complete, ...filters } = request
        await sut.list(request)
        const skip = getSkip(filters)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip,
          recordsPerPage: 15
        }, expect.any(Object))
      })

      test('Should call ListEntitiesRepository with correct if recordsPerPage is small or equal zero', async () => {
        const { sut, listEntitiesRepository, request } = makeSut()
        const listSpy = jest.spyOn(listEntitiesRepository, 'list')
        request.recordsPerPage = datatype.number(-1)
        const { complete, ...filters } = request
        await sut.list(request)
        const skip = getSkip(filters)
        delete filters.page
        expect(listSpy).toHaveBeenCalledWith({
          ...filters,
          skip,
          recordsPerPage: 15
        }, expect.any(Object))
      })
    })

    test('Should call ListEntitiesRepository with correct if orderDirection is not provided', async () => {
      const { sut, listEntitiesRepository, request, skip } = makeSut()
      const listSpy = jest.spyOn(listEntitiesRepository, 'list')
      delete request.orderDirection
      const { complete, ...filters } = request
      await sut.list(request)
      delete filters.page
      expect(listSpy).toHaveBeenCalledWith({
        ...filters,
        skip,
        orderDirection: OrderDirection.ASC
      }, expect.any(Object))
    })

    test('Should return correct list model if succeeds', async () => {
      const { sut, listEntitiesRepository, countEntitiesRepository, request } = makeSut()
      const list = await sut.list(request)
      const lastPage = countEntitiesRepository.recordCount % request.recordsPerPage === 0
        ? Math.trunc(countEntitiesRepository.recordCount / request.recordsPerPage)
        : Math.trunc(countEntitiesRepository.recordCount / request.recordsPerPage) + 1
      expect(list).toEqual({
        data: listEntitiesRepository.entities,
        page: request.page,
        record_count: countEntitiesRepository.recordCount,
        last_page: Math.round(lastPage)
      })
    })

    test('Should return correct list model if succeeds and recordCount is divisible per recordsPerPage', async () => {
      const { sut, listEntitiesRepository, countEntitiesRepository, request } = makeSut()
      countEntitiesRepository.recordCount = request.recordsPerPage * datatype.number()
      const list = await sut.list(request)
      expect(list).toEqual({
        data: listEntitiesRepository.entities,
        page: request.page,
        record_count: countEntitiesRepository.recordCount,
        last_page: Math.round(countEntitiesRepository.recordCount / request.recordsPerPage)
      })
    })
  })
})
