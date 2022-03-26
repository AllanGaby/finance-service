import { GetAccessSessionByTokenUseCase, AccessSessionModel, mockAccessSessionModel } from '@/domain/authentication'

export class GetAccessSessionByTokenUseCaseSpy implements GetAccessSessionByTokenUseCase {
  accessToken: string
  accessSession: AccessSessionModel = mockAccessSessionModel()

  async getByToken (accessToken: string): Promise<AccessSessionModel> {
    this.accessToken = accessToken
    return this.accessSession
  }
}
