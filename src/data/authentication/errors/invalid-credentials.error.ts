export class InvalidCredentialsError extends Error {
  constructor () {
    super('Invalid credentials to access')
    this.name = 'InvalidCredentialsError'
  }
}
