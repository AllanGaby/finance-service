export interface EncryptRequestWithPublicKeyProtocol {
  createToken: (payload: string) => string
}
