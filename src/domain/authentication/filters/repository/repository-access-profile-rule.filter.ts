export enum RepositoryAccessProfileRuleFilter {
  Id = '"access_profile_rule"."id"',
  AccessProfileId = '"access_profile_rule"."access_profile_id"',
  AccessProfileName = '"access_profile"."name"',
  AccessProfileEnabled = '"access_profile"."enabled"',
  ModuleAccessRuleId = '"access_profile_rule"."module_access_rule_id"',
  ModuleAccessRuleTitle = '"module_access_rules"."title"',
  ModuleAccessRuleKey = '"module_access_rules"."rule_key"',
  CreatedAt = 'date_trunc(\'day\',"access_profile_rule"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"access_profile_rule"."updated_at")::text'
}
