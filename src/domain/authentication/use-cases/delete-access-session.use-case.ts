import { AccessSessionPayloadModel } from '@/domain/authentication'

export interface DeleteAccessSessionUseCase {
  delete: (accessSession: AccessSessionPayloadModel) => Promise<void>
}
