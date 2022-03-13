export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Column '${paramName}' is required`)
    this.name = 'MissingParamError'
  }
}
