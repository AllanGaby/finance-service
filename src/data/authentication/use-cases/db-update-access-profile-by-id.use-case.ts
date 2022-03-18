import { UpdateEntityByIdUseCase } from '@/domain/common'
import { DbUpdateEntityByIdUseCase } from '@/data/common/use-cases'
import { UpdateAccessProfileDTO, AccessProfileModel, RefreshAccessProfileRulesUseCase } from '@/domain/authentication'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/protocols/repositories'

export class DbUpdateAccessProfileByIdUseCase extends DbUpdateEntityByIdUseCase<AccessProfileModel, UpdateAccessProfileDTO>
  implements UpdateEntityByIdUseCase<AccessProfileModel, UpdateAccessProfileDTO> {
  constructor (
    getAccessProfileByIdRepository: GetEntityByIdRepository<AccessProfileModel>,
    updateAccessProfileByIdRepository: UpdateEntityRepository<AccessProfileModel>,
    private readonly refreshAccessProfileRulesUseCase: RefreshAccessProfileRulesUseCase
  ) {
    super(getAccessProfileByIdRepository, updateAccessProfileByIdRepository, 'AccessProfile')
  }

  async updateById (accessProfileId: string, params: UpdateAccessProfileDTO): Promise<AccessProfileModel> {
    const accessProfile = await super.updateById(accessProfileId, params)
    await this.refreshAccessProfileRulesUseCase.refreshRules({
      access_profile_id: accessProfile.id,
      rules_id: params.rules_id
    })
    return accessProfile
  }
}
