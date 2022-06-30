export enum RepositoryFinanceTransactionTagFilter {
  Id = '"finance_transaction_tag"."finance_transaction_id"',
  Name = '"finance_transaction_tag"."transaction_tag_id"',
  CreatedAt = 'date_trunc(\'day\',"finance_transaction_tag"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"finance_transaction_tag"."updated_at")::text'
}
