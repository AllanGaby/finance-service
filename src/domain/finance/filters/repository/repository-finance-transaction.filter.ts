export enum RepositoryFinanceTransactionFilter {
  Id = '"finance_transaction"."id"',
  Title = '"finance_transaction"."title"',
  Type = '"finance_transaction"."type::text"',
  Date = 'date_trunc(\'day\',"finance_transaction"."date")::text',
  Value = '"finance_transaction"."value"',
  CreatedAt = 'date_trunc(\'day\',"finance_transaction"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"finance_transaction"."updated_at")::text',
  CompanyId = '"company"."id"',
  CompanyName = '"company"."name"',
  CompanyCreatedAt = 'date_trunc(\'day\',"company"."created_at")::text',
  CompanyUpdatedAt = 'date_trunc(\'day\',"company"."updated_at")::text',
  FinanceAccountId = '"finance_account"."id"',
  FinanceAccountName = '"finance_account"."name"',
  FinanceAccountType = '"finance_account"."type::text"',
  FinanceAccountClosingDate = 'date_trunc(\'day\',"finance_account"."closing_date")::text',
  FinanceAccountDueDate = 'date_trunc(\'day\',"finance_account"."due_date")::text',
  FinanceAccountCreditDate = 'date_trunc(\'day\',"finance_account"."credit_date")::text',
  FinanceAccountDefaultCreditValue = '"finance_account"."default_credit_value"',
  FinanceAccountDefaultCreditReleased = '"finance_account"."default_credit_released"',
  FinanceAccountAccountId = '"finance_account"."account_id"',
  FinanceAccountCreatedAt = 'date_trunc(\'day\',"finance_account"."created_at")::text',
  FinanceAccountUpdatedAt = 'date_trunc(\'day\',"finance_account"."updated_at")::text',
  InvoiceId = '"invoice"."id"',
  InvoiceStartDate = 'date_trunc(\'day\',"invoice"."start_date")::text',
  InvoiceFinalDate = 'date_trunc(\'day\',"invoice"."final_date")::text',
  InvoiceDueDate = 'date_trunc(\'day\',"invoice"."due_date")::text',
  InvoiceValue = '"invoice"."value"',
  InvoiceValuePredict = '"invoice"."value_predict"',
  InvoicePaymentValue = '"invoice"."payment_value"',
  InvoiceStatus = '"invoice"."status::text"',
  InvoiceValueInstrallments = '"invoice"."value_installments"',
  InvoiceCreatedAt = 'date_trunc(\'day\',"invoice"."created_at")::text',
  InvoiceUpdatedAt = 'date_trunc(\'day\',"invoice"."updated_at")::text',
  InvoiceCompanyId = '"company"."id"',
  InvoiceCompanyName = '"company"."name"',
  InvoiceCompanyCreatedAt = 'date_trunc(\'day\',"company"."created_at")::text',
  InvoiceCompanyUpdatedAt = 'date_trunc(\'day\',"company"."updated_at")::text',
  TransactionCategoryId = '"transaction_category"."id"',
  TransactionCategoryName = '"transaction_category"."name"',
  TransactionCategoryCredit = '"transaction_category"."credit"',
  TransactionCategoryDebit = '"transaction_category"."debit"',
  TransactionCategoryCreatedAt = 'date_trunc(\'day\',"transaction_category"."created_at")::text',
  TransactionCategoryUpdatedAt = 'date_trunc(\'day\',"transaction_category"."updated_at")::text',
  TransactionTagsId = '"transaction_tags"."id"',
  TransactionTagsName = '"transaction_tags"."name"',
  TransactionTagsCreatedAt = 'date_trunc(\'day\',"transaction_tags"."created_at")::text',
  TransactionTagsUpdatedAt = 'date_trunc(\'day\',"transaction_tags"."updated_at")::text',
}
