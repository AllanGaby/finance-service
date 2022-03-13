import { DbUpdateEntityByIdUseCase } from './db-update-entity-by-id.use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { UpdateEntityRepositorySpy, GetEntityByIdRepositorySpy } from '@/protocols/repositories'
import { EntityIsNotFoundError, EntityAlreadyExistsError } from '@/data/common/errors'
import { database } from 'faker'

type sutTypes = {
  sut: DbUpdateEntityByIdUseCase<EntityModel>
  getEntityByIdRepository: GetEntityByIdRepositorySpy<EntityModel>
  updateEntityRepository: UpdateEntityRepositorySpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const getEntityByIdRepository = new GetEntityByIdRepositorySpy<EntityModel>()
  getEntityByIdRepository.entity = mockEntityModel()
  const updateEntityRepository = new UpdateEntityRepositorySpy<EntityModel>()
  const sut = new DbUpdateEntityByIdUseCase<EntityModel>(getEntityByIdRepository, updateEntityRepository, database.column())
  return {
    sut,
    getEntityByIdRepository,
    updateEntityRepository
  }
}

describe('DbUpdateEntityByIdUseCase', () => {
  test('Should call GetEntityByIdRepository with correct value', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    const request = mockEntityModel()
    await sut.updateById(request.id, request)
    expect(getEntityByIdRepository.entityId).toBe(request.id)
  })

  test('Should return EntityIsNotFoundError if GetEntityByIdRepository return undefined', async () => {
    const { sut, getEntityByIdRepository } = makeSut()
    delete getEntityByIdRepository.entity
    const request = mockEntityModel()
    const promise = sut.updateById(request.id, request)
    await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
  })

  test('Should call UpdateEntityRepository with correct value', async () => {
    const { sut, getEntityByIdRepository, updateEntityRepository } = makeSut()
    const request = mockEntityModel()
    await sut.updateById(request.id, request)
    expect(updateEntityRepository.params).toEqual({
      ...request,
      id: getEntityByIdRepository.entity.id
    })
  })

  test('Should return same UpdateEntityRepository returns', async () => {
    const { sut, updateEntityRepository } = makeSut()
    const request = mockEntityModel()
    const result = await sut.updateById(request.id, request)
    expect(result).toEqual(updateEntityRepository.entity)
  })

  test('Should return EntityAlreadyExistsError if UpdateEntityRepository fails', async () => {
    const { sut, updateEntityRepository } = makeSut()
    jest.spyOn(updateEntityRepository, 'update').mockRejectedValueOnce(new EntityAlreadyExistsError(database.column()))
    const promise = sut.updateById(mockEntityModel().id, mockEntityModel())
    await expect(promise).rejects.toThrowError(EntityAlreadyExistsError)
  })
})
