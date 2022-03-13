import { ModuleAccessRuleModel, AuthenticationAccessRules } from '@/domain/authentication'
import { CreateEntityDTO } from '@/domain/common'

export const AuthenticationModuleAccessRules: Array<CreateEntityDTO<Omit<ModuleAccessRuleModel, 'module_id'>>> = [
  {
    rule_key: AuthenticationAccessRules.CreateModules,
    title: 'Criar novos módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateModules,
    title: 'Atualizar dados de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.ListModules,
    title: 'Listar módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.ShowModules,
    title: 'Visualizar dados detalhados de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteModules,
    title: 'Excluir módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.CreateModuleAccessRules,
    title: 'Criar novas regras de acesso para módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateModuleAccessRules,
    title: 'Atualizar regras de acesso de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.ListModuleAccessRules,
    title: 'Listar regras de acesso de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.ShowModuleAccessRules,
    title: 'Visualizar dados detalhados de regras de acesso de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteModuleAccessRules,
    title: 'Excluir regras de acesso de módulos/aplicações'
  },
  {
    rule_key: AuthenticationAccessRules.CreateAccessProfiles,
    title: 'Criar novos perfis de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateAccessProfiles,
    title: 'Atualizar perfis de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ListAccessProfiles,
    title: 'Listar perfis de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ShowAccessProfiles,
    title: 'Visualizar dados detalhados de perfis de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteAccessProfiles,
    title: 'Excluir perfis de acesso'
  }
]
