export class CorruptedAccountError extends Error {
  constructor () {
    super('This account has been improperly changed')
    this.name = 'CorruptedAccountError'
  }
}
