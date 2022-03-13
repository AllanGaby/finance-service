import { DbUpdateVersionedEntityByIdUseCase } from './db-update-versioned-entity-by-id.use-case'
import {
  CreateNewEntityVersionUseCaseSpy,
  VersionedEntityModel,
  UpdateEntityDTO,
  mockVersionedEntityModel
} from '@/domain/common'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbUpdateVersionedEntityByIdUseCase<VersionedEntityModel>
  entityId: string
  updateVersionedEntityDTO: UpdateEntityDTO<VersionedEntityModel>
  createNewEntityVersionUseCase: CreateNewEntityVersionUseCaseSpy<VersionedEntityModel>
}

const makeSut = (): sutTypes => {
  const createNewEntityVersionUseCase = new CreateNewEntityVersionUseCaseSpy<VersionedEntityModel>()
  const sut = new DbUpdateVersionedEntityByIdUseCase<VersionedEntityModel>(createNewEntityVersionUseCase)
  return {
    sut,
    entityId: datatype.uuid(),
    updateVersionedEntityDTO: mockVersionedEntityModel(),
    createNewEntityVersionUseCase
  }
}

describe('DbUpdateVersionedEntityByIdUseCase', () => {
  test('Should call CreateNewEntityVersionUseCase with correct value', async () => {
    const { sut, entityId, updateVersionedEntityDTO, createNewEntityVersionUseCase } = makeSut()
    const createVersionSpy = jest.spyOn(createNewEntityVersionUseCase, 'createVersion')
    await sut.updateById(entityId, updateVersionedEntityDTO)
    expect(createVersionSpy).toHaveBeenCalledWith(entityId, updateVersionedEntityDTO)
  })

  test('Should fails if CreateNewEntityVersionUseCase fails', async () => {
    const { sut, entityId, updateVersionedEntityDTO, createNewEntityVersionUseCase } = makeSut()
    jest.spyOn(createNewEntityVersionUseCase, 'createVersion').mockRejectedValue(new Error())
    const promise = sut.updateById(entityId, updateVersionedEntityDTO)
    await expect(promise).rejects.toThrow()
  })

  test('Should return same CreateNewEntityVersionUseCase returns', async () => {
    const { sut, entityId, updateVersionedEntityDTO, createNewEntityVersionUseCase } = makeSut()
    const newVersionEntity = mockVersionedEntityModel()
    jest.spyOn(createNewEntityVersionUseCase, 'createVersion').mockResolvedValue(newVersionEntity)
    const response = await sut.updateById(entityId, updateVersionedEntityDTO)
    expect(response).toEqual(newVersionEntity)
  })
})
