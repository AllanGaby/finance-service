import { AccessSessionPayloadModel, AccessSessionModel, DeleteAccessSessionUseCase } from '@/domain/authentication'
import { InvalidateCacheByKeyProtocol } from '@/protocols/cache'
import { SoftDeleteEntityByIdRepository } from '@/protocols/repositories'

export class DbDeleteAccessSessionUseCase implements DeleteAccessSessionUseCase {
  constructor (
    private readonly invalidateCacheAdapter: InvalidateCacheByKeyProtocol,
    private readonly deleteAccessSessionRepository: SoftDeleteEntityByIdRepository<AccessSessionModel>
  ) {}

  async delete (accessSession: AccessSessionPayloadModel): Promise<void> {
    await this.invalidateCacheAdapter.invalidateByKey(`session:${accessSession.account_id}:${accessSession.session_id}`)
    await this.deleteAccessSessionRepository.softDeleteById(accessSession.session_id)
  }
}
