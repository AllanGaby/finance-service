export class MissingParamError extends Error {
  constructor (paramIdName: string) {
    super(`Column '${paramIdName}' is required`)
    this.name = 'MissingParamError'
  }
}
