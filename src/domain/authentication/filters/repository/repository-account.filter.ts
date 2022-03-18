export enum RepositoryAccountFilter {
  Id = '"account"."id"',
  Name = '"account"."name"',
  Email = '"account"."email"',
  Identification = '"account"."identification"',
  CreatedAt = 'date_trunc(\'day\',"account"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"account"."updated_at")::text'
}
