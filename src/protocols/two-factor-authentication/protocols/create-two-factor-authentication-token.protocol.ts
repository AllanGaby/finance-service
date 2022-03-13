export interface CreateTwoFactorAuthenticationTokenProtocol {
  createToken: (secret: string) => string
}
