export enum RepositoryCompanyFilter {
  Id = '"company"."id"',
  Name = '"company"."name"',
  CreatedAt = 'date_trunc(\'day\',"company"."created_at")::text',
  UpdatedAt = 'date_trunc(\'day\',"company"."updated_at")::text',
  CompanyTypeId = '"company_type"."id"',
  CompanyTypeName = '"company_type"."name"',
  CompanyTypeCreatedAt = 'date_trunc(\'day\',"company_type"."created_at")::text',
  CompanyTypeUpdatedAt = 'date_trunc(\'day\',"company_type"."updated_at")::text'
}
