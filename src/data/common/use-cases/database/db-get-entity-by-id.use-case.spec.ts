import { DbGetEntityByIdUseCase } from './db-get-entity-by-id.use-case'
import { mockEntityModel, EntityModel } from '@/domain/common'
import { GetEntityByIdRepositorySpy, mockRepositoryOptionsModel } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { RepositoryOptionsModel } from '@/protocols/repositories'
import { database, datatype } from 'faker'

type sutTypes = {
  sut: DbGetEntityByIdUseCase<EntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<EntityModel>
  options: RepositoryOptionsModel
}

const makeSut = (options?: RepositoryOptionsModel): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy()
  getEntityByIdRepository.entity = mockEntityModel()
  const sut = new DbGetEntityByIdUseCase(getEntityByIdRepository, database.column(), options)
  return {
    sut,
    getEntityByIdRepository,
    options
  }
}

describe('DbGetEntityByIdUseCase', () => {
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

  test('Should return same GetEntityByIdRepository returns', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const result = await sut.getById(datatype.uuid())
    expect(result).toEqual(getEntityByIdRepository.entity)
  })
})
