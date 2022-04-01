export enum RepositoryRequestRecoverPasswordFilter {
  Id = '"request_recover_password"."id"',
  ValidationCode = '"request_recover_password"."validation_code"',
  AccountId = '"request_recover_password"."account_id"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  CreatedAt = 'date_trunc(\'day\',"request_recover_password"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"request_recover_password"."updated_at")::text'
}
