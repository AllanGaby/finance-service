export enum RepositoryAccessSessionFilter {
  Id = '"access_session"."id"',
  AccountName = '"account"."name"',
  AccountEmail = '"account"."email"',
  AccountIdentification = '"account"."identification"',
  CreatedAt = 'date_trunc(\'day\',"access_session"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"access_session"."updated_at")::text'
}
