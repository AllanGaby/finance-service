export enum RepositoryAccountProviderFilter {
  Id = '"account_provider"."id"',
  AccountProviderId = '"account_provider"."account_provider_id"',
  AccountProvider = '"account_provider"."provider"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  CreatedAt = 'date_trunc(\'day\',"account_provider"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"account_provider"."updated_at")::text'
}
