import { AccessSessionModel } from '@/domain/authentication'

export interface GetAccessSessionByTokenUseCase {
  getByToken: (accessToken: string) => Promise<AccessSessionModel>
}
