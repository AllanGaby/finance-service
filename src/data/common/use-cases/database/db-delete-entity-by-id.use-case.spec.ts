import { DbDeleteEntityByIdUseCase } from './db-delete-entity-by-id.use-case'
import { EntityModel } from '@/domain/common'
import { DeleteEntityByIdRepositorySpy } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbDeleteEntityByIdUseCase<EntityModel>
  deleteEntityByIdRepository: DeleteEntityByIdRepositorySpy<EntityModel>
}

const makeSut = (): sutTypes => {
  const deleteEntityByIdRepository = new DeleteEntityByIdRepositorySpy<EntityModel>()
  const sut = new DbDeleteEntityByIdUseCase<EntityModel>(deleteEntityByIdRepository)
  return {
    sut,
    deleteEntityByIdRepository
  }
}

describe('DbDeleteEntityByIdUseCase', () => {
  test('Should call DeleteEntityByIdRepository with correct value', async () => {
    const { sut, deleteEntityByIdRepository } = makeSut()
    const deleteById = jest.spyOn(deleteEntityByIdRepository, 'deleteById')
    const entityId = datatype.uuid()
    await sut.deleteById(entityId)
    expect(deleteById).toHaveBeenCalledWith(entityId)
  })

  test('Should fails if DeleteEntityByIdRepository fails', async () => {
    const { sut, deleteEntityByIdRepository } = makeSut()
    jest.spyOn(deleteEntityByIdRepository, 'deleteById').mockRejectedValue(new Error())
    const promise = sut.deleteById(datatype.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return void if DeleteEntityByIdRepository is succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.deleteById(datatype.uuid())
    expect(response).toBeFalsy()
  })
})
