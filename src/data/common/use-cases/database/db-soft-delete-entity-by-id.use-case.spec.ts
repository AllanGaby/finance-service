import { DbSoftDeleteEntityByIdUseCase } from './db-soft-delete-entity-by-id.use-case'
import { EntityModel } from '@/domain/common'
import { SoftDeleteEntityByIdRepositorySpy } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbSoftDeleteEntityByIdUseCase<EntityModel>
  softDeleteEntityByIdRepository: SoftDeleteEntityByIdRepositorySpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const softDeleteEntityByIdRepository = new SoftDeleteEntityByIdRepositorySpy<EntityModel>()
  const sut = new DbSoftDeleteEntityByIdUseCase<EntityModel>(softDeleteEntityByIdRepository)
  return {
    sut,
    softDeleteEntityByIdRepository
  }
}

describe('DbSoftDeleteEntityByIdUseCase', () => {
  test('Should call SoftDeleteEntityByIdRepository with correct value', async () => {
    const { sut, softDeleteEntityByIdRepository } = makeSut()
    const softDeleteById = jest.spyOn(softDeleteEntityByIdRepository, 'softDeleteById')
    const entityId = datatype.uuid()
    await sut.deleteById(entityId)
    expect(softDeleteById).toHaveBeenCalledWith(entityId)
  })

  test('Should fails if SoftDeleteEntityByIdRepository fails', async () => {
    const { sut, softDeleteEntityByIdRepository } = makeSut()
    jest.spyOn(softDeleteEntityByIdRepository, 'softDeleteById').mockRejectedValue(new Error())
    const promise = sut.deleteById(datatype.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return void if DeleteEntityByIdRepository is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.deleteById(datatype.uuid())
    expect(response).toBeFalsy()
  })
})
