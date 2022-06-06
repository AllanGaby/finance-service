export enum RepositoryTransactionCategoryFilter {
  Id = '"transaction_category"."id"',
  Name = '"transaction_category"."name"',
  Credit = '"transaction_category"."credit"',
  Debit = '"transaction_category"."debit"',
  CreatedAt = 'date_trunc(\'day\',"transaction_category"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"transaction_category"."updated_at")::text',
  AccountId = '"account"."id"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  AccountCreatedAt = 'date_trunc(\'day\',"account"."created_at")::text',
  AccountUpdatedAt = 'date_trunc(\'day\',"account"."updated_at")::text'
}
