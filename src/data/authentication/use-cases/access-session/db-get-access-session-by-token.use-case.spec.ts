import { DbGetAccessSessionbyTokenUseCase } from './db-get-access-session-by-token.use-case'
import {
  AccessSessionModel,
  AccessTokenPayloadModel,
  JsonWebTokenPayload,
  mockAccessSessionModel,
  mockAccessTokenPayloadModel
} from '@/domain/authentication'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { RecoverCacheByKeyProtocolSpy } from '@/protocols/cache'
import { JsonWebTokenModel, mockJsonWebTokenModel, ParseJsonWebTokenProtocolSpy } from '@/protocols/jwt'
import { DecryptRequestWithPrivateKeyProtocolSpy } from '@/protocols/rsa'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbGetAccessSessionbyTokenUseCase
  accessSession: AccessSessionModel
  parsedJWT: JsonWebTokenModel
  accessTokenPayload: AccessTokenPayloadModel
  token: string
  parseJWTAdapter: ParseJsonWebTokenProtocolSpy
  decryptRequestWithPrivateKeyAdapter: DecryptRequestWithPrivateKeyProtocolSpy
  recoverAccessSessionInCacheAdapter: RecoverCacheByKeyProtocolSpy
}

const makeSut = (): sutTypes => {
  const parseJWTAdapter = new ParseJsonWebTokenProtocolSpy()
  const parsedJWT = mockJsonWebTokenModel()
  jest.spyOn(parseJWTAdapter, 'parseJWT').mockResolvedValue(parsedJWT)
  const accessSession = mockAccessSessionModel()
  const accessTokenPayload = mockAccessTokenPayloadModel()
  const decryptRequestWithPrivateKeyAdapter = new DecryptRequestWithPrivateKeyProtocolSpy()
  jest.spyOn(decryptRequestWithPrivateKeyAdapter, 'decrypt').mockReturnValue(JSON.stringify(accessTokenPayload))
  const recoverAccessSessionInCacheAdapter = new RecoverCacheByKeyProtocolSpy()
  jest.spyOn(recoverAccessSessionInCacheAdapter, 'recover').mockResolvedValue(accessSession)
  const sut = new DbGetAccessSessionbyTokenUseCase(
    parseJWTAdapter,
    decryptRequestWithPrivateKeyAdapter,
    recoverAccessSessionInCacheAdapter
  )
  return {
    sut,
    token: datatype.uuid(),
    accessSession,
    parseJWTAdapter,
    parsedJWT,
    accessTokenPayload,
    decryptRequestWithPrivateKeyAdapter,
    recoverAccessSessionInCacheAdapter
  }
}

describe('DbGetAccessSessionbyTokenUseCase', () => {
  describe('Parse JWT', () => {
    test('Should call ParseJWTAdapter with correct value', async () => {
      const { sut, token, parseJWTAdapter } = makeSut()
      const parsedJWTSpy = jest.spyOn(parseJWTAdapter, 'parseJWT')
      await sut.getByToken(token)
      expect(parsedJWTSpy).toHaveBeenCalledWith(token)
    })

    test('Should return InvalidCredentialsError if ParseJWTAdapter fails', async () => {
      const { sut, token, parseJWTAdapter } = makeSut()
      jest.spyOn(parseJWTAdapter, 'parseJWT').mockRejectedValue(new Error())
      const promise = sut.getByToken(token)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Decrypt RSA Data', () => {
    test('Should call DecryptRequestWithPrivateKeyAdapter with correct value', async () => {
      const { sut, token, decryptRequestWithPrivateKeyAdapter, parsedJWT } = makeSut()
      const decryptSpy = jest.spyOn(decryptRequestWithPrivateKeyAdapter, 'decrypt')
      const payload = parsedJWT.payload as JsonWebTokenPayload
      await sut.getByToken(token)
      expect(decryptSpy).toHaveBeenCalledWith(payload.access_token)
    })

    test('Should return InvalidCredentialsError if DecryptRequestWithPrivateKeyAdapter fails', async () => {
      const { sut, token, decryptRequestWithPrivateKeyAdapter } = makeSut()
      jest.spyOn(decryptRequestWithPrivateKeyAdapter, 'decrypt').mockImplementation(() => { throw new Error() })
      const promise = sut.getByToken(token)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Search AccessSession', () => {
    test('Should call RecoverAccessSessionInCacheAdapter with correct value', async () => {
      const { sut, token, recoverAccessSessionInCacheAdapter, accessTokenPayload } = makeSut()
      const decryptSpy = jest.spyOn(recoverAccessSessionInCacheAdapter, 'recover')
      await sut.getByToken(token)
      expect(decryptSpy).toHaveBeenCalledWith(`session:${accessTokenPayload.account_id}:${accessTokenPayload.session_id}`)
    })

    test('Should return InvalidCredentialsError if RecoverAccessSessionInCacheAdapter fails', async () => {
      const { sut, token, recoverAccessSessionInCacheAdapter } = makeSut()
      jest.spyOn(recoverAccessSessionInCacheAdapter, 'recover').mockRejectedValue((_: string) => { throw new Error() })
      const promise = sut.getByToken(token)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })
})
