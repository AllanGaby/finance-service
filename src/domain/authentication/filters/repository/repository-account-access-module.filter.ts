export enum RepositoryAccountAccessModuleFilter {
  Id = '"account_access_module"."id"',
  AccessProfileName = '"access_profile"."name"',
  AccessProfileKey = '"access_profile"."access_profile_key"',
  AccessProfileEnabled = '"access_profile"."enabled"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  ModuleId = '"module_access_rule"."module_id"',
  ModuleName = '"module"."name"',
  ModuleKey = '"module"."module_key"',
  ModuleDescription = '"module"."description"',
  ModuleEnabled = '"module"."enabled"',
  CreatedAt = 'date_trunc(\'day\',"account_access_module"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"account_access_module"."updated_at")::text'
}
