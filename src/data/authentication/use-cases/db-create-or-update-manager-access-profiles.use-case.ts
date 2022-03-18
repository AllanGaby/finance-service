import {
  CreateOrUpdateManagerAccessProfilesUseCase,
  ModuleModel,
  AccessProfileModel,
  CreateAccessProfileDTO,
  UpdateAccessProfileDTO,
  RepositoryAccessProfileFilter
} from '@/domain/authentication'
import {
  CreateEntityUseCase,
  UpdateEntityByIdUseCase,
  CustomFilterConditional,
  CustomFilterOperator
} from '@/domain/common'
import { ListEntitiesRepository } from '@/protocols/repositories'

export class DbCreateOrUpdateManagerAccessProfilesUseCase implements CreateOrUpdateManagerAccessProfilesUseCase {
  constructor (
    private readonly listModulesRepository: ListEntitiesRepository<ModuleModel>,
    private readonly listAccessProfileRepository: ListEntitiesRepository<AccessProfileModel>,
    private readonly createAccessProfileUseCase: CreateEntityUseCase<AccessProfileModel, CreateAccessProfileDTO>,
    private readonly updateAccessProfileUseCase: UpdateEntityByIdUseCase<AccessProfileModel, UpdateAccessProfileDTO>
  ) { }

  async createOrUpdateAccessProfiles (): Promise<AccessProfileModel[]> {
    const moduleList = await this.listModulesRepository.list()
    const accessProfileList: AccessProfileModel[] = []
    for (const module of moduleList) {
      const moduleAccessRuleList: string[] =
        module.access_rules?.map<string>(accessRule => accessRule.id)
      const accessProfileKey = `${module.module_key}_manager`
      const accessProfileName = `${module.name}(Administrador)`

      const moduleAccessProfileList = await this.listAccessProfileRepository.list({
        filters: [{
          field: RepositoryAccessProfileFilter.ModuleId,
          conditional: CustomFilterConditional.equal,
          operator: CustomFilterOperator.and,
          value: module.id
        }, {
          field: RepositoryAccessProfileFilter.Key,
          conditional: CustomFilterConditional.equal,
          operator: CustomFilterOperator.and,
          value: accessProfileKey
        }]
      })
      const accessProfileDTO: CreateAccessProfileDTO = {
        access_profile_key: accessProfileKey,
        enabled: true,
        module_id: module.id,
        name: accessProfileName,
        rules_id: moduleAccessRuleList
      }
      let managerAccessProfile: AccessProfileModel
      if (moduleAccessProfileList.length > 0) {
        const currentManagerAccessProfile = moduleAccessProfileList[0]
        managerAccessProfile = await this.updateAccessProfileUseCase.updateById(currentManagerAccessProfile.id, accessProfileDTO)
      } else {
        managerAccessProfile = await this.createAccessProfileUseCase.create(accessProfileDTO) as AccessProfileModel
      }
      accessProfileList.push(managerAccessProfile)
    }

    return accessProfileList
  }
}
