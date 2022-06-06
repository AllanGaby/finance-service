import { DbCopyEntityUseCase } from './db-copy-entity.use-case'
import { mockEntityModel, EntityModel, CopyEntityDTO, mockCopyEntityDTO } from '@/domain/common'
import { CreateEntityRepositorySpy, GetEntityByIdRepositorySpy, mockRepositoryOptionsModel, RepositoryOptionsModel } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { database } from 'faker'

type sutTypes = {
  sut: DbCopyEntityUseCase<EntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<EntityModel>
  createEntityRepository: CreateEntityRepositorySpy<EntityModel>
  copyEntityDTO: CopyEntityDTO
  options: RepositoryOptionsModel
}

const makeSut = (options?: RepositoryOptionsModel): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy()
  const createEntityRepository = new CreateEntityRepositorySpy<EntityModel>()
  getEntityByIdRepository.entity = mockEntityModel()
  const sut = new DbCopyEntityUseCase(getEntityByIdRepository, createEntityRepository, database.column(), options)
  return {
    sut,
    copyEntityDTO: mockCopyEntityDTO(),
    getEntityByIdRepository,
    createEntityRepository,
    options
  }
}

describe('DbCopyEntityUseCase', () => {
  describe('Get source Entity', () => {
    test('Should call getEntityByIdRepository with correct value if options is not provided', async () => {
      const options = undefined
      const { sut, getEntityByIdRepository, copyEntityDTO } = makeSut(options)
      const getByIdSpy = jest.spyOn(getEntityByIdRepository, 'getById')
      await sut.copy(copyEntityDTO)
      expect(getByIdSpy).toHaveBeenCalledWith(copyEntityDTO.id, {
        returnDeletedEntities: true
      })
    })

    test('Should call getEntityByIdRepository with correct value if options is provided', async () => {
      const options = mockRepositoryOptionsModel()
      const { sut, getEntityByIdRepository, copyEntityDTO } = makeSut(options)
      const getByIdSpy = jest.spyOn(getEntityByIdRepository, 'getById')
      await sut.copy(copyEntityDTO)
      expect(getByIdSpy).toHaveBeenCalledWith(copyEntityDTO.id, options)
    })

    test('Should return EntityIsNotFoundError if getEntityByIdRepository returns undefined', async () => {
      const { sut, getEntityByIdRepository, copyEntityDTO } = makeSut()
      jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(undefined)
      const promise = sut.copy(copyEntityDTO)
      await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    })

    test('Should fails if getEntityByIdRepository fails', async () => {
      const { sut, getEntityByIdRepository, copyEntityDTO } = makeSut()
      jest.spyOn(getEntityByIdRepository, 'getById').mockRejectedValue(new Error())
      const promise = sut.copy(copyEntityDTO)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Create a new Entity', () => {
    test('Should call createEntityRepository with correct value', async () => {
      const entity = mockEntityModel()
      const { sut, getEntityByIdRepository, createEntityRepository, copyEntityDTO } = makeSut()
      jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(entity)
      const createSpy = jest.spyOn(createEntityRepository, 'create')
      await sut.copy(copyEntityDTO)
      expect(createSpy).toHaveBeenCalledWith({})
    })

    test('Should return same createEntityRepository returns', async () => {
      const { sut, createEntityRepository, copyEntityDTO } = makeSut()
      const entity = mockEntityModel()
      jest.spyOn(createEntityRepository, 'create').mockResolvedValue(entity)
      const result = await sut.copy(copyEntityDTO)
      expect(result).toEqual(entity)
    })
  })
})
