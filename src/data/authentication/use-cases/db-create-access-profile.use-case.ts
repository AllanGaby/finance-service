import { CreateEntityUseCase } from '@/domain/common'
import { DbCreateEntityUseCase } from '@/data/common/use-cases'
import { CreateAccessProfileDTO, AccessProfileModel, RefreshAccessProfileRulesUseCase } from '@/domain/authentication'
import { CreateEntityRepository } from '@/protocols/repositories'

export class DbCreateAccessProfileUseCase extends DbCreateEntityUseCase<AccessProfileModel, CreateAccessProfileDTO>
  implements CreateEntityUseCase<AccessProfileModel, CreateAccessProfileDTO> {
  constructor (
    createEntityRepository: CreateEntityRepository<AccessProfileModel>,
    private readonly refreshAccessProfileRulesUseCase: RefreshAccessProfileRulesUseCase
  ) {
    super(createEntityRepository)
  }

  async create (params: CreateAccessProfileDTO): Promise<AccessProfileModel> {
    const accessProfile = await super.create(params)
    await this.refreshAccessProfileRulesUseCase.refreshRules({
      access_profile_id: accessProfile.id,
      rules_id: params.rules_id
    })
    return accessProfile
  }
}
