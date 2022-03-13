import { DbGetFileByEntityIdUseCase } from './db-get-file-by-entity-id.use-case'
import { mockEntityModel, EntityModel } from '@/domain/common'
import { GetEntityByIdRepositorySpy, mockRepositoryOptionsModel, RepositoryOptionsModel } from '@/protocols/repositories'
import { FileExistsInStorageProtocolSpy, GetFileInStorageProtocolSpy } from '@/protocols/storage'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { database, datatype, random, system } from 'faker'

type sutTypes = {
  sut: DbGetFileByEntityIdUseCase<EntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<EntityModel>
  fileField: string
  fileExistsInStorageAdapter: FileExistsInStorageProtocolSpy
  getFileInStorageAdapter: GetFileInStorageProtocolSpy
  options: RepositoryOptionsModel
}

const makeSut = (options?: RepositoryOptionsModel): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy()
  getEntityByIdRepository.entity = mockEntityModel()
  const fileField = random.arrayElement(Object.keys(getEntityByIdRepository.entity))
  const fileExistsInStorageAdapter = new FileExistsInStorageProtocolSpy()
  const getFileInStorageAdapter = new GetFileInStorageProtocolSpy()
  const sut = new DbGetFileByEntityIdUseCase(
    getEntityByIdRepository,
    database.column(),
    fileField,
    fileExistsInStorageAdapter,
    getFileInStorageAdapter,
    options
  )
  return {
    sut,
    getEntityByIdRepository,
    fileField,
    fileExistsInStorageAdapter,
    getFileInStorageAdapter,
    options
  }
}

describe('DbGetFileByEntityIdUseCase', () => {
  test('Should call GetEntityByIdRepository with correct value if options is not provided', async () => {
    const options = undefined
    const { sut, getEntityByIdRepository } = makeSut(options)
    const getByIdSpy = jest.spyOn(getEntityByIdRepository, 'getById')
    const entityId = datatype.uuid()
    await sut.getById(entityId)
    expect(getByIdSpy).toHaveBeenCalledWith(entityId, {
      returnDeletedEntities: true
    })
  })

  test('Should call GetEntityByIdRepository with correct value if options is provided', async () => {
    const options = mockRepositoryOptionsModel()
    const { sut, getEntityByIdRepository } = makeSut(options)
    const getByIdSpy = jest.spyOn(getEntityByIdRepository, 'getById')
    const entityId = datatype.uuid()
    await sut.getById(entityId)
    expect(getByIdSpy).toHaveBeenCalledWith(entityId, options)
  })

  test('Should return EntityIsNotFoundError if GetEntityByIdRepository returns undefined', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(undefined)
    const promise = sut.getById(datatype.uuid())
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should fails if GetEntityByIdRepository fails', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    jest.spyOn(getEntityByIdRepository, 'getById').mockRejectedValue(new Error())
    const promise = sut.getById(datatype.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return undefined if GetEntityByIdRepository return a entity without file', async () => {
    const { sut, getEntityByIdRepository, fileField } = makeSut()
    const entity = mockEntityModel()
    entity[fileField] = undefined
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
    const result = await sut.getById(datatype.uuid())
    expect(result).toBeFalsy()
  })

  test('Should call FileExistsInStorageAdapter if GetEntityByIdRepository return a entity with file', async () => {
    const { sut, fileExistsInStorageAdapter, getEntityByIdRepository, fileField } = makeSut()
    const entity = mockEntityModel()
    entity[fileField] = system.fileName()
    const existsSpy = jest.spyOn(fileExistsInStorageAdapter, 'exists')
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
    await sut.getById(datatype.uuid())
    expect(existsSpy).toHaveBeenCalledWith(entity[fileField])
  })

  test('Should return undefined if FileExistsInStorageAdapter return false', async () => {
    const { sut, getEntityByIdRepository, fileField, fileExistsInStorageAdapter } = makeSut()
    const entity = mockEntityModel()
    entity[fileField] = system.fileName()
    jest.spyOn(fileExistsInStorageAdapter, 'exists').mockResolvedValue(false)
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
    const result = await sut.getById(datatype.uuid())
    expect(result).toBeFalsy()
  })

  test('Should call GetFileInStorageAdapter if FileExistsInStorageAdapter return true', async () => {
    const { sut, getEntityByIdRepository, fileField, fileExistsInStorageAdapter, getFileInStorageAdapter } = makeSut()
    const entity = mockEntityModel()
    entity[fileField] = system.fileName()
    jest.spyOn(fileExistsInStorageAdapter, 'exists').mockResolvedValue(true)
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
    const getSpy = jest.spyOn(getFileInStorageAdapter, 'get')
    await sut.getById(datatype.uuid())
    expect(getSpy).toHaveBeenCalledWith(entity[fileField])
  })

  test('Should return same GetFileInStorageAdapter returns', async () => {
    const { sut, getEntityByIdRepository, fileField, fileExistsInStorageAdapter, getFileInStorageAdapter } = makeSut()
    const entity = mockEntityModel()
    entity[fileField] = system.fileName()
    jest.spyOn(fileExistsInStorageAdapter, 'exists').mockResolvedValue(true)
    jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
    const fileContent = Buffer.from(datatype.uuid())
    jest.spyOn(getFileInStorageAdapter, 'get').mockResolvedValue(fileContent)
    const result = await sut.getById(datatype.uuid())
    expect(result).toEqual(fileContent)
  })
})
