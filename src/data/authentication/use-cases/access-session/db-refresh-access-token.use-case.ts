import { AccessSessionPayloadModel, RefreshAccessTokenUseCase, RefreshAccessTokenDTO, GetAccessSessionByTokenUseCase, CreateAccessSessionDTO, AccountModel } from '@/domain/authentication'
import { CreateEntityUseCase, SettingsModel } from '@/domain/common'
import { InvalidateCacheByKeyProtocol } from '@/protocols/cache'
import { GetEntityByIdRepository } from '@/protocols/repositories'

export class DbRefreshAccessTokenUseCase implements RefreshAccessTokenUseCase {
  constructor (
    private readonly getAccessSessionByTokenUseCase: GetAccessSessionByTokenUseCase,
    private readonly invalidateCacheAdapter: InvalidateCacheByKeyProtocol,
    private readonly getAccountByIdRepository: GetEntityByIdRepository<AccountModel>,
    private readonly createAccessSessionUseCase: CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO>
  ) {}

  async refresh ({
    access_token: accessToken,
    ip
  }: RefreshAccessTokenDTO, settings: SettingsModel): Promise<AccessSessionPayloadModel> {
    const accessSession = await this.getAccessSessionByTokenUseCase.getByToken(accessToken)
    await this.invalidateCacheAdapter.invalidateByKey(`session:${accessSession.account_id}:${accessSession.id}`)
    const account = await this.getAccountByIdRepository.getById(accessSession.account_id)
    const newAccessSession = await this.createAccessSessionUseCase.create({
      ...account,
      ip
    }, settings) as AccessSessionPayloadModel
    return newAccessSession
  }
}
