import { RefreshAccessProfileRulesDTO, AccessProfileRuleModel } from '@/domain/authentication'

export interface RefreshAccessProfileRulesUseCase {
  refreshRules: (params: RefreshAccessProfileRulesDTO) => Promise<AccessProfileRuleModel[]>
}
