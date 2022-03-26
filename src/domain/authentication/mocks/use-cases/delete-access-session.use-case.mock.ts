import { DeleteAccessSessionUseCase, AccessSessionPayloadModel } from '@/domain/authentication'

export class DeleteAccessSessionUseCaseSpy implements DeleteAccessSessionUseCase {
  accessSession: AccessSessionPayloadModel

  async delete (accessSession: AccessSessionPayloadModel): Promise<void> {
    this.accessSession = accessSession
  }
}
