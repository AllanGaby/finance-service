import { DbDeleteAccessSessionUseCase } from './db-delete-access-session.use-case'
import { InvalidateCacheByKeyProtocolSpy } from '@/protocols/cache'
import { SoftDeleteEntityByIdRepositorySpy } from '@/protocols/repositories'
import { AccessSessionModel, AccessSessionPayloadModel, mockAccessSessionPayloadModel } from '@/domain/authentication'

type sutTypes = {
  sut: DbDeleteAccessSessionUseCase
  accessSession: AccessSessionPayloadModel
  invalidateCacheAdapter: InvalidateCacheByKeyProtocolSpy
  deleteAccessSessionRepository: SoftDeleteEntityByIdRepositorySpy<AccessSessionModel>
}

const makeSut = (): sutTypes => {
  const invalidateCacheAdapter = new InvalidateCacheByKeyProtocolSpy()
  const deleteAccessSessionRepository = new SoftDeleteEntityByIdRepositorySpy<AccessSessionModel>()
  const sut = new DbDeleteAccessSessionUseCase(
    invalidateCacheAdapter,
    deleteAccessSessionRepository
  )
  return {
    sut,
    accessSession: mockAccessSessionPayloadModel(),
    invalidateCacheAdapter,
    deleteAccessSessionRepository
  }
}

describe('DbDeleteAccessSessionUseCase', () => {
  describe('Invalidate AccessSession in cache', () => {
    test('Should call invalidateCacheAdapter with correct value', async () => {
      const { sut, accessSession, invalidateCacheAdapter } = makeSut()
      const invalidateByKeySpy = jest.spyOn(invalidateCacheAdapter, 'invalidateByKey')
      await sut.delete(accessSession)
      expect(invalidateByKeySpy).toHaveBeenCalledWith(`session:${accessSession.account_id}:${accessSession.session_id}`)
    })
  })

  describe('Delete AccessSession in Database', () => {
    test('Should call DeleteAccessSessionRepository with correct value', async () => {
      const { sut, accessSession, deleteAccessSessionRepository } = makeSut()
      const softDeleteByIdSpy = jest.spyOn(deleteAccessSessionRepository, 'softDeleteById')
      await sut.delete(accessSession)
      expect(softDeleteByIdSpy).toHaveBeenCalledWith(accessSession.session_id)
    })
  })
})
