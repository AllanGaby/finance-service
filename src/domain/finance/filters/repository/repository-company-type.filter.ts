export enum RepositoryCompanyTypeFilter {
  Id = '"company_type"."id"',
  Name = '"company_type"."name"',
  CreatedAt = 'date_trunc(\'day\',"company_type"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"company_type"."updated_at")::text'
}
