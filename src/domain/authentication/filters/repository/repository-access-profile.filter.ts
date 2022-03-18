export enum RepositoryAccessProfileFilter {
  Id = '"access_profile"."id"',
  Name = '"access_profile"."name"',
  Key = '"access_profile"."access_profile_key"',
  Enabled = '"access_profile"."enabled"',
  ModuleId = '"access_profile"."module_id"',
  ModuleName = '"module"."name"',
  ModuleKey = '"module"."module_key"',
  ModuleDescription = '"module"."description"',
  ModuleEnabled = '"module"."enabled"',
  CreatedAt = 'date_trunc(\'day\',"access_profile"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"access_profile"."updated_at")::text'
}
