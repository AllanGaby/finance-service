export enum RepositoryModuleAccessRuleFilter {
  Id = '"module_access_rule"."id"',
  Title = '"module_access_rule"."title"',
  Description = '"module_access_rule"."description"',
  Key = '"module_access_rule"."rule_key"',
  ModuleId = '"module_access_rule"."module_id"',
  ModuleName = '"module"."name"',
  ModuleKey = '"module"."module_key"',
  ModuleDescription = '"module"."description"',
  ModuleEnabled = '"module"."enabled"',
  CreatedAt = 'date_trunc(\'day\',"module_access_rule"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"module_access_rule"."updated_at")::text'
}
