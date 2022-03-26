import { GetAccessSessionByTokenUseCase, AccessSessionModel, JsonWebTokenPayload, AccessTokenPayloadModel } from '@/domain/authentication'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { ParseJsonWebTokenProtocol } from '@/protocols/jwt'
import { DecryptRequestWithPrivateKeyProtocol } from '@/protocols/rsa'
import { RecoverCacheByKeyProtocol } from '@/protocols/cache'

export class DbGetAccessSessionbyTokenUseCase implements GetAccessSessionByTokenUseCase {
  constructor (
    private readonly parseJWTAdapter: ParseJsonWebTokenProtocol,
    private readonly decryptRequestWithPrivateKeyAdapter: DecryptRequestWithPrivateKeyProtocol,
    private readonly recoverAccessSessionInCacheAdapter: RecoverCacheByKeyProtocol
  ) {}

  async getByToken (jwt: string): Promise<AccessSessionModel> {
    try {
      const parsedJWT = await this.parseJWTAdapter.parseJWT(jwt)
      const { access_token: accessToken } = parsedJWT.payload as JsonWebTokenPayload
      const { account_id: accountId, session_id: sessionId }: AccessTokenPayloadModel = JSON.parse(this.decryptRequestWithPrivateKeyAdapter.decrypt(accessToken))
      return this.recoverAccessSessionInCacheAdapter.recover<AccessSessionModel>(`session:${accountId}:${sessionId}`).catch(_ => {
        throw new InvalidCredentialsError()
      })
    } catch {
      throw new InvalidCredentialsError()
    }
  }
}
