import { DbCreateNewEntityVersionUseCase } from './db-create-new-entity-version.use-case'
import {
  CreateEntityRepositorySpy,
  GetOneEntityRepositorySpy,
  SoftDeleteEntityRepositorySpy
} from '@/protocols/repositories'
import { CustomFilterConditional, CustomFilterOperator, mockVersionedEntityModel, UpdateEntityDTO, VersionedEntityModel } from '@/domain/common'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateNewEntityVersionUseCase<VersionedEntityModel>
  entityId: string
  createNewEntityVersionDTO: UpdateEntityDTO<VersionedEntityModel>
  getEntityOneRepository: GetOneEntityRepositorySpy<VersionedEntityModel>
  entityName: string
  softDeleteEntityRepository: SoftDeleteEntityRepositorySpy<VersionedEntityModel>
  createNewEntityEntityRepository: CreateEntityRepositorySpy<VersionedEntityModel>
}

const makeSut = (): sutTypes => {
  const getEntityOneRepository = new GetOneEntityRepositorySpy<VersionedEntityModel>()
  getEntityOneRepository.entity = mockVersionedEntityModel()
  const entityName = datatype.uuid()
  const softDeleteEntityRepository = new SoftDeleteEntityRepositorySpy<VersionedEntityModel>()
  const createNewEntityEntityRepository = new CreateEntityRepositorySpy<VersionedEntityModel>()
  createNewEntityEntityRepository.entity = mockVersionedEntityModel()
  const sut = new DbCreateNewEntityVersionUseCase<VersionedEntityModel>(
    getEntityOneRepository,
    entityName,
    softDeleteEntityRepository,
    createNewEntityEntityRepository
  )
  return {
    sut,
    entityId: datatype.uuid(),
    createNewEntityVersionDTO: mockVersionedEntityModel(),
    getEntityOneRepository,
    entityName,
    softDeleteEntityRepository,
    createNewEntityEntityRepository
  }
}

describe('DbCreateNewEntityVersionUseCase', () => {
  describe('Find Current version', () => {
    test('Should call getEntityOneRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository } = makeSut()
      const getByIdSpy = jest.spyOn(getEntityOneRepository, 'getOne')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(getByIdSpy).toHaveBeenCalledWith([{
        field: 'id',
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: entityId
      }, {
        field: 'deleted_at',
        conditional: CustomFilterConditional.isEmpty,
        operator: CustomFilterOperator.and,
        value: undefined
      }], {
        useJoin: false
      })
    })

    test('Should fails if getEntityOneRepository fails', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository } = makeSut()
      jest.spyOn(getEntityOneRepository, 'getOne').mockRejectedValue(new Error())
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrow()
    })

    test('Should return EntityIsNotFoundError if getEntityOneRepository return undefined', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository } = makeSut()
      jest.spyOn(getEntityOneRepository, 'getOne').mockResolvedValue(undefined)
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    })

    describe('If getEntityOneRepository fails', () => {
      test('Should not call SoftDeleteEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, softDeleteEntityRepository } = makeSut()
        const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDelete')
        jest.spyOn(getEntityOneRepository, 'getOne').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(softDeleteByIdSpy).not.toHaveBeenCalled()
      })

      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(getEntityOneRepository, 'getOne').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(createSpy).not.toHaveBeenCalled()
      })
    })

    describe('If getEntityOneRepository return undefined', () => {
      test('Should not call SoftDeleteEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, softDeleteEntityRepository } = makeSut()
        const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDelete')
        jest.spyOn(getEntityOneRepository, 'getOne').mockResolvedValue(undefined)
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
        expect(softDeleteByIdSpy).not.toHaveBeenCalled()
      })

      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(getEntityOneRepository, 'getOne').mockResolvedValue(undefined)
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
        expect(createSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('Delete Old Entity Version', () => {
    test('Should call SoftDeleteEntityRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, softDeleteEntityRepository } = makeSut()
      const softDeleteByIdSpy = jest.spyOn(softDeleteEntityRepository, 'softDelete')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(softDeleteByIdSpy).toHaveBeenCalledWith({
        id: getEntityOneRepository.entity.id,
        version: getEntityOneRepository.entity.version
      })
    })

    test('Should fails if SoftDeleteEntityRepository fails', async () => {
      const { sut, entityId, createNewEntityVersionDTO, softDeleteEntityRepository } = makeSut()
      jest.spyOn(softDeleteEntityRepository, 'softDelete').mockRejectedValue(new Error())
      const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
      await expect(promise).rejects.toThrow()
    })

    describe('If SoftDeleteEntityRepository fails', () => {
      test('Should not call CreateNewEntityEntityRepository', async () => {
        const { sut, entityId, createNewEntityVersionDTO, softDeleteEntityRepository, createNewEntityEntityRepository } = makeSut()
        const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
        jest.spyOn(softDeleteEntityRepository, 'softDelete').mockRejectedValue(new Error())
        const promise = sut.createVersion(entityId, createNewEntityVersionDTO)
        await expect(promise).rejects.toThrow()
        expect(createSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('Create New Entity Version', () => {
    test('Should call CreateNewEntityEntityRepository with correct value', async () => {
      const { sut, entityId, createNewEntityVersionDTO, getEntityOneRepository, createNewEntityEntityRepository } = makeSut()
      const createSpy = jest.spyOn(createNewEntityEntityRepository, 'create')
      await sut.createVersion(entityId, createNewEntityVersionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        ...getEntityOneRepository.entity,
        ...createNewEntityVersionDTO,
        deleted_at: null,
        version: getEntityOneRepository.entity.version + 1,
        id: getEntityOneRepository.entity.id
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
