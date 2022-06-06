export enum SearchInvoiceFilter {
  StartDate = 'date_trunc(\'day\',"invoice"."start_date")::text',
  FinalDate = 'date_trunc(\'day\',"invoice"."final_date")::text',
  DueDate = 'date_trunc(\'day\',"invoice"."due_date")::text',
  CompanyName = '"company"."name"',
  FinanceAccountName = '"finance_account"."name"',
  FinanceAccountForPaymentName = '"finance_account_for_payment"."name"',
  FinanceTransactionTitle = '"finance_transactions"."title"'
}
