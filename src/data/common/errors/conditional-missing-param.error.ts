export class ConditionalMissingParamError extends Error {
  constructor (paramIdName: string, conditionalMessage: string) {
    super(`Column '${paramIdName}' is required when ${conditionalMessage}`)
    this.name = 'ConditionalMissingParamError'
  }
}
