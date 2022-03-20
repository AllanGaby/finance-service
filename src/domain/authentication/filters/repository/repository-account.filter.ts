export enum RepositoryAccountFilter {
  Id = '"account"."id"',
  Name = '"account"."name"',
  Email = '"account"."email"',
  Identification = '"account"."identification"',
  ModuleId = '"modules"."module_id"',
  ModuleName = '"modules"."name"',
  ModuleKey = '"modules"."module_key"',
  ModuleDescription = '"modules"."description"',
  ModuleEnabled = '"modules"."enabled"',
  AccessProfileId = '"access_profile"."id"',
  AccessProfileName = '"access_profile"."name"',
  AccessProfileKey = '"access_profile"."access_profile_key"',
  AccessProfileEnabled = '"access_profile"."enabled"',
  ModuleAccessRuleId = '"module_access_rules"."id"',
  ModuleAccessRuleTitle = '"module_access_rules"."title"',
  ModuleAccessRuleDescription = '"module_access_rules"."description"',
  ModuleAccessRuleKey = '"module_access_rules"."rule_key"',
  CreatedAt = 'date_trunc(\'day\',"account"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"account"."updated_at")::text'
}
