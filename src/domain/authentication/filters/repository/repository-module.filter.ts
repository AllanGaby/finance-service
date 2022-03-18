export enum RepositoryModuleFilter {
  Id = '"module"."id"',
  Name = '"module"."name"',
  Description = '"module"."description"',
  Enabled = '"module"."enabled"',
  Key = '"module"."module_key"',
  AccessRuleId = '"access_rules"."id"',
  AccessRuleTitle = '"access_rules"."title"',
  AccessRuleDescription = '"access_rules"."description"',
  AccessRuleKey = '"access_rules"."rule_key"',
  CreatedAt = 'date_trunc(\'day\',"module"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"module"."updated_at")::text'
}
