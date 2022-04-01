import { ModuleAccessRuleModel } from '@/domain/authentication'
import { CommonAccessRules, CreateEntityDTO } from '@/domain/common'

export const CommonModuleAccessRules: Array<CreateEntityDTO<Omit<ModuleAccessRuleModel, 'module_id'>>> = [
  {
    rule_key: CommonAccessRules.UpdateSettings,
    title: 'Atualizar as configurações do módulo de autenticação'
  },
  {
    rule_key: CommonAccessRules.ListSettings,
    title: 'Listar as configurações do módulo de autenticação'
  },
  {
    rule_key: CommonAccessRules.ShowSettings,
    title: 'Visualizar dados detalhados da configuraçãO do módulo de autenticação'
  }
]
