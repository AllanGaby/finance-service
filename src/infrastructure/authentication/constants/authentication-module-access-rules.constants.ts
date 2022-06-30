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
  },
  {
    rule_key: AuthenticationAccessRules.CreateFinanceAccount,
    title: 'Adiciona novas contas financeiras para o usuário'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateFinanceAccount,
    title: 'Atualizar dados de contas financeiras do usuário'
  },
  {
    rule_key: AuthenticationAccessRules.ListFinanceAccount,
    title: 'Listar as contas financeiras do usuário'
  },
  {
    rule_key: AuthenticationAccessRules.ShowFinanceAccount,
    title: 'Visualizar dados detalhados de contas financeiras do usuário'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteFinanceAccount,
    title: 'Excluir contas financeiras do usuário'
  },
  {
    rule_key: AuthenticationAccessRules.CreateCompanyType,
    title: 'Adiciona novos tipos de empresa'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateCompanyType,
    title: 'Atualizar dados de tipos de empresa'
  },
  {
    rule_key: AuthenticationAccessRules.ListCompanyType,
    title: 'Listar os tipos de empresa'
  },
  {
    rule_key: AuthenticationAccessRules.ShowCompanyType,
    title: 'Visualizar dados detalhados de tipos de empresa'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteCompanyType,
    title: 'Excluir tipos de empresa'
  },
  {
    rule_key: AuthenticationAccessRules.CreateCompany,
    title: 'Adiciona novas empresas'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateCompany,
    title: 'Atualizar dados de empresas'
  },
  {
    rule_key: AuthenticationAccessRules.ListCompany,
    title: 'Listar as empresas'
  },
  {
    rule_key: AuthenticationAccessRules.ShowCompany,
    title: 'Visualizar dados detalhados de empresas'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteCompany,
    title: 'Excluir empresas'
  },
  {
    rule_key: AuthenticationAccessRules.CreateFinanceTransaction,
    title: 'Adiciona novas transações financeiras'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateFinanceTransaction,
    title: 'Atualizar dados de transações financeiras'
  },
  {
    rule_key: AuthenticationAccessRules.ListFinanceTransaction,
    title: 'Listar as transações financeiras'
  },
  {
    rule_key: AuthenticationAccessRules.ShowFinanceTransaction,
    title: 'Visualizar dados detalhados de transações financeiras'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteFinanceTransaction,
    title: 'Excluir transações financeiras'
  },
  {
    rule_key: AuthenticationAccessRules.CreateInvoice,
    title: 'Adiciona novas faturas'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateInvoice,
    title: 'Atualizar dados de faturas'
  },
  {
    rule_key: AuthenticationAccessRules.ListInvoice,
    title: 'Listar as faturas'
  },
  {
    rule_key: AuthenticationAccessRules.ShowInvoice,
    title: 'Visualizar dados detalhados de faturas'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteInvoice,
    title: 'Excluir faturas'
  },
  {
    rule_key: AuthenticationAccessRules.CreateTransactionCategory,
    title: 'Adiciona novas categorias de transações'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateTransactionCategory,
    title: 'Atualizar dados de categorias de transações'
  },
  {
    rule_key: AuthenticationAccessRules.ListTransactionCategory,
    title: 'Listar as categorias de transações'
  },
  {
    rule_key: AuthenticationAccessRules.ShowTransactionCategory,
    title: 'Visualizar dados detalhados de categorias de transações'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteTransactionCategory,
    title: 'Excluir categorias de transações'
  },
  {
    rule_key: AuthenticationAccessRules.CreateTransactionTag,
    title: 'Adiciona novas tags de transações'
  },
  {
    rule_key: AuthenticationAccessRules.UpdateTransactionTag,
    title: 'Atualizar dados de tags de transações'
  },
  {
    rule_key: AuthenticationAccessRules.ListTransactionTag,
    title: 'Listar as tags de transações'
  },
  {
    rule_key: AuthenticationAccessRules.ShowTransactionTag,
    title: 'Visualizar dados detalhados de tags de transações'
  },
  {
    rule_key: AuthenticationAccessRules.DeleteTransactionTag,
    title: 'Excluir tags de transações'
  }
]
