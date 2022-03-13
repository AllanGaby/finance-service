export class ConditionalMissingParamError extends Error {
  constructor (paramName: string, conditionalMessage: string) {
    super(`Column '${paramName}' is required when ${conditionalMessage}`)
    this.name = 'ConditionalMissingParamError'
  }
}
