import {
  AccessProfileRuleModel,
  RefreshAccessProfileRulesDTO,
  RefreshAccessProfileRulesUseCase,
  RepositoryAccessProfileRuleFilter
} from '@/domain/authentication'
import { CreateEntityDTO, CustomFilterConditional, CustomFilterModel } from '@/domain/common'
import { ListEntitiesRepository, DeleteEntitiesByListIdRepository, CreateEntityInBulkRepository } from '@/protocols/repositories'

export class DbRefreshAccessProfileRulesUseCase implements RefreshAccessProfileRulesUseCase {
  constructor (
    private readonly listAccessProfileRulesRepository: ListEntitiesRepository<AccessProfileRuleModel>,
    private readonly deleteAccessProfileRulesRepository: DeleteEntitiesByListIdRepository<AccessProfileRuleModel>,
    private readonly createAccessProfileRuleRepository: CreateEntityInBulkRepository<AccessProfileRuleModel>
  ) {}

  async refreshRules ({ access_profile_id: accessProfileId, rules_id: rulesIdList }: RefreshAccessProfileRulesDTO): Promise<AccessProfileRuleModel[]> {
    const accessProfileFilter: CustomFilterModel[] = [{
      field: RepositoryAccessProfileRuleFilter.AccessProfileId,
      conditional: CustomFilterConditional.equal,
      value: accessProfileId
    }]
    const currentAccessProfileRulesList = await this.listAccessProfileRulesRepository.list({
      filters: accessProfileFilter
    })
    const deleteAccessProfileRuleIdList: string[] = []
    currentAccessProfileRulesList.forEach(accessProfileRule => {
      if (!rulesIdList.includes(accessProfileRule.module_access_rule_id)) {
        deleteAccessProfileRuleIdList.push(accessProfileRule.id)
      } else {
        rulesIdList = rulesIdList.filter(item => item !== accessProfileRule.module_access_rule_id)
      }
    })
    if (deleteAccessProfileRuleIdList.length > 0) {
      await this.deleteAccessProfileRulesRepository.deleteByListId(deleteAccessProfileRuleIdList)
    }
    if (rulesIdList.length > 0) {
      const createAccessProfileRuleList: Array<CreateEntityDTO<AccessProfileRuleModel>> = []
      rulesIdList.forEach(ruleId => {
        createAccessProfileRuleList.push({
          access_profile_id: accessProfileId,
          module_access_rule_id: ruleId
        })
      })
      await this.createAccessProfileRuleRepository.createInBulk(createAccessProfileRuleList)
    }
    return this.listAccessProfileRulesRepository.list({
      filters: accessProfileFilter
    })
  }
}
