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
  },
  {
    rule_key: AuthenticationAccessRules.UpdateAuthenticationSettings,
    title: 'Atualizar configurações do módulo de autenticação'
  },
  {
    rule_key: AuthenticationAccessRules.ShowAuthenticationSettings,
    title: 'Visualizar dados detalhados de configurações do módulo de autenticação'
  },
  {
    rule_key: AuthenticationAccessRules.CreateAccount,
    title: 'Criar novas conta de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateAccount,
    title: 'Atualizar dados de conta de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ListAccount,
    title: 'Listar contas de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ShowAccount,
    title: 'Visualizar dados detalhados de conta de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteAccount,
    title: 'Excluir conta de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.CreateAccountAccessModule,
    title: 'Adiciona novos módulos/aplicações aos acessos de conta de acesso'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateAccountAccessModule,
    title: 'Atualizar dados de módulos/aplicações que a conta de acesso tem acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ListAccountAccessModule,
    title: 'Listar os módulos/aplicações que contas possuem acesso'
  },
  {
    rule_key: AuthenticationAccessRules.ShowAccountAccessModule,
    title: 'Visualizar dados detalhados de módulos/aplicações que conta de acesso possui acesso'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteAccountAccessModule,
    title: 'Excluir módulos/aplicações dos acessos da conta de acesso'
  }
]
