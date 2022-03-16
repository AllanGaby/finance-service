import {
  RefreshAccessProfileRulesUseCase,
  RefreshAccessProfileRulesDTO,
  AccessProfileRuleModel,
  mockAccessProfileRuleModel
} from '@/domain/authentication'

export class RefreshAccessProfileRulesUseCaseSpy implements RefreshAccessProfileRulesUseCase {
  params: RefreshAccessProfileRulesDTO
  accessProfileRules: AccessProfileRuleModel[] = [
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel()
  ]

  async refreshRules (params: RefreshAccessProfileRulesDTO): Promise<AccessProfileRuleModel[]> {
    this.params = params
    return this.accessProfileRules
  }
}
