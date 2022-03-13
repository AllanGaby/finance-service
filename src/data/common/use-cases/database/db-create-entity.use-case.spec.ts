import { DbCreateEntityUseCase } from './db-create-entity.use-case'
import { EntityModel, mockEntityModel } from '@/domain/common'
import { CreateEntityRepositorySpy } from '@/protocols/repositories'
import { InvalidForeignKeyError, MissingParamError, ViolateUniqueKeyError } from '@/data/common/errors'

type sutTypes = {
  sut: DbCreateEntityUseCase<EntityModel>
  createEntityRepository: CreateEntityRepositorySpy
}

const makeSut = (): sutTypes => {
  const createEntityRepository = new CreateEntityRepositorySpy()
  const sut = new DbCreateEntityUseCase<EntityModel>(createEntityRepository)
  return {
    sut,
    createEntityRepository
  }
}

describe('DbCreateEntityUseCase', () => {
  test('Should call CreateEntityRepository with correct value', async () => {
    const { sut, createEntityRepository } = makeSut()
    const request = mockEntityModel()
    await sut.create(request)
    expect(createEntityRepository.params).toEqual(request)
  })

  test('Should return EntityAlreadyExistsError if CreateEntityRepository throws a MissingParamError', async () => {
    const { sut, createEntityRepository } = makeSut()
    jest.spyOn(createEntityRepository, 'create').mockRejectedValueOnce(new MissingParamError('entity'))
    const promise = sut.create(mockEntityModel())
    await expect(promise).rejects.toThrowError(MissingParamError)
  })

  test('Should return EntityAlreadyExistsError if CreateEntityRepository throws a InvalidForeignKeyError', async () => {
    const { sut, createEntityRepository } = makeSut()
    jest.spyOn(createEntityRepository, 'create').mockRejectedValueOnce(new InvalidForeignKeyError('entity'))
    const promise = sut.create(mockEntityModel())
    await expect(promise).rejects.toThrowError(InvalidForeignKeyError)
  })

  test('Should return EntityAlreadyExistsError if CreateEntityRepository throws a ViolateUniqueKeyError', async () => {
    const { sut, createEntityRepository } = makeSut()
    jest.spyOn(createEntityRepository, 'create').mockRejectedValueOnce(new ViolateUniqueKeyError('entity'))
    const promise = sut.create(mockEntityModel())
    await expect(promise).rejects.toThrowError(ViolateUniqueKeyError)
  })

  test('Should return same CreateEntityRepository returns', async () => {
    const { sut, createEntityRepository } = makeSut()
    const result = await sut.create(mockEntityModel())
    expect(result).toEqual(createEntityRepository.entity)
  })
})
