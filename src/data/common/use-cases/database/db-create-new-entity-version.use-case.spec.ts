import { DbCreateNewEntityVersionUseCase } from './db-create-new-entity-version.use-case'
import {
  CreateEntityRepositorySpy,
  GetEntityByIdRepositorySpy,
  SoftDeleteEntityByIdRepositorySpy
} from '@/protocols/repositories'
import { mockVersionedEntityModel, UpdateEntityDTO, VersionedEntityModel } from '@/domain/common'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateNewEntityVersionUseCase<VersionedEntityModel>
  entityId: string
  createNewEntityVersionDTO: UpdateEntityDTO<VersionedEntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<VersionedEntityModel>
  entityName: string
  softDeleteEntityRepository: SoftDeleteEntityByIdRepositorySpy<VersionedEntityModel>
  createNewEntityEntityRepository: CreateEntityRepositorySpy<VersionedEntityModel>
}

const makeSut = (): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy<VersionedEntityModel>()
  getEntityByIdRepository.entity = mockVersionedEntityModel()
  const entityName = datatype.uuid()
  const softDeleteEntityRepository = new SoftDeleteEntityByIdRepositorySpy<VersionedEntityModel>()
  const createNewEntityEntityRepository = new CreateEntityRepositorySpy<VersionedEntityModel>()
  createNewEntityEntityRepository.entity = mockVersionedEntityModel()
  const sut = new DbCreateNewEntityVersionUseCase<VersionedEntityModel>(
    getEntityByIdRepository,
    entityName,
    softDeleteEntityRepository,
    createNewEntityEntityRepository
  )
  return {
    sut,
    entityId: datatype.uuid(),
    createNewEntityVersionDTO: mockVersionedEntityModel(),
    getEntityByIdRepository,
    entityName,
    softDeleteEntityRepository,
    createNewEntityEntityRepository
  }
}

describe('DbCreateNewEntityVersionUseCase', () => {
  describe('Find Entity By Id', () => {
    test('Should call GetEntityByIdRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository } = makeSut()
      const getByIdSpy = jest.spyOn(getEntityByIdRepository, 'getById')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(getByIdSpy).toHaveBeenCalledWith(entityId, {
        useJoin: false
      })
    })

    test('Should fails if GetEntityByIdRepository fails', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository } = makeSut()
      jest.spyOn(getEntityByIdRepository, 'getById').mockRejectedValue(new Error())
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrow()
    })

    test('Should return EntityIsNotFoundError if GetEntityByIdRepository return undefined', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository } = makeSut()
      jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(undefined)
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    })

    describe('If GetEntityByIdRepository fails', () => {
      test('Should not call SoftDeleteEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, softDeleteEntityRepository } = makeSut()
        const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDeleteById')
        jest.spyOn(getEntityByIdRepository, 'getById').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(softDeleteByIdSpy).not.toHaveBeenCalled()
      })

      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(getEntityByIdRepository, 'getById').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(createSpy).not.toHaveBeenCalled()
      })
    })

    describe('If GetEntityByIdRepository return undefined', () => {
      test('Should not call SoftDeleteEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, softDeleteEntityRepository } = makeSut()
        const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDeleteById')
        jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(undefined)
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
        expect(softDeleteByIdSpy).not.toHaveBeenCalled()
      })

      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(getEntityByIdRepository, 'getById').mockResolvedValue(undefined)
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
        expect(createSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('Delete Old Entity Version', () => {
    test('Should call SoftDeleteEntityRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, softDeleteEntityRepository } = makeSut()
      const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDeleteById')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(softDeleteByIdSpy).toHaveBeenCalledWith(getEntityByIdRepository.entity.id)
    })

    test('Should fails if SoftDeleteEntityRepository fails', async () => {
      const { sut, entityId, createNewEntityVersionDTO, softDeleteEntityRepository } = makeSut()
      jest.spyOn(softDeleteEntityRepository, 'softDeleteById').mockRejectedValue(new Error())
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrow()
    })

    describe('If SoftDeleteEntityRepository fails', () => {
      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, softDeleteEntityRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(softDeleteEntityRepository, 'softDeleteById').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(createSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('Create New Entity Version', () => {
    test('Should call CreateNewEntityEntityRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityByIdRepository, createNewEntityEntityRepository } = makeSut()
      const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        ...getEntityByIdRepository.entity,
        ...createNewEntityVersionDTO,
        deleted_at: null,
        current_version_id: null,
        version: getEntityByIdRepository.entity.version + 1,
        last_version_id: getEntityByIdRepository.entity.id
      })
    })

    test('Should fails if CreateNewEntityEntityRepository fails', async () => {
      const { sut, entityId, createNewEntityVersionDTO, createNewEntityEntityRepository } = makeSut()
      jest.spyOn(createNewEntityEntityRepository, 'create').mockRejectedValue(new Error())
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Return New Entity Version', () => {
    test('Should return new Entity Version', async () => {
      const { sut, entityId, createNewEntityVersionDTO, createNewEntityEntityRepository } = makeSut()
      const newEntityVersion = mockVersionedEntityModel()
      jest.spyOn(createNewEntityEntityRepository, 'create').mockResolvedValue(newEntityVersion)
      const response = await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(response).toEqual(newEntityVersion)
    })
  })
})
