export enum RepositoryFinanceUserSettingsFilter {
  Id = '"finance_user_settings"."id"',
  MonthsToPredict = '"finance_user_settings"."months_to_predict"',
  CreatedAt = 'date_trunc(\'day\',"finance_user_settings"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"finance_user_settings"."updated_at")::text',
  AccountId = '"account"."id"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  AccountCreatedAt = 'date_trunc(\'day\',"account"."created_at")::text',
  AccountUpdatedAt = 'date_trunc(\'day\',"account"."updated_at")::text'
}
