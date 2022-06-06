export enum RepositoryTransactionTagFilter {
  Id = '"transaction_tag"."id"',
  Name = '"transaction_tag"."name"',
  CreatedAt = 'date_trunc(\'day\',"transaction_tag"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"transaction_tag"."updated_at")::text',
  AccountId = '"account"."id"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  AccountCreatedAt = 'date_trunc(\'day\',"account"."created_at")::text',
  AccountUpdatedAt = 'date_trunc(\'day\',"account"."updated_at")::text'
}
