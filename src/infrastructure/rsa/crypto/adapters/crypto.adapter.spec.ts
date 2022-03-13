import { CryptoAdapter } from './crypto.adapter'
import { random, datatype } from 'faker'
import crypto from 'crypto'

type sutTypes = {
  sut: CryptoAdapter
  privateKey: string
  publicKey: string
}

const makeSut = (): sutTypes => {
  const privateKey = datatype.uuid()
  const publicKey = datatype.uuid()
  const sut = new CryptoAdapter(privateKey, publicKey)
  return {
    sut,
    privateKey,
    publicKey
  }
}

describe('CryptoAdapter', () => {
  describe('Decrypt', () => {
    test('Should call privateDecrypt with correct value', () => {
      const { sut, privateKey } = makeSut()
      const message = random.words()
      jest.spyOn(crypto, 'privateDecrypt').mockImplementationOnce((): Buffer => Buffer.from(''))
      const privateDecryptSpy = jest.spyOn(crypto, 'privateDecrypt')
      sut.decrypt(message)
      expect(privateDecryptSpy).toHaveBeenCalledWith({
        key: privateKey,
        passphrase: '',
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, Buffer.from(message, 'base64'))
    })

    test('Should return message decrypted', () => {
      const { sut } = makeSut()
      const decryptedMessage = random.words()
      jest.spyOn(crypto, 'privateDecrypt').mockImplementationOnce((): Buffer => Buffer.from(decryptedMessage))
      const result = sut.decrypt(datatype.uuid())
      expect(result).toEqual(decryptedMessage)
    })
  })

  describe('CreateToken', () => {
    test('Should call publicEncrypt with correct value', () => {
      const { sut, publicKey } = makeSut()
      const payload = random.words()
      jest.spyOn(crypto, 'publicEncrypt').mockImplementationOnce((): Buffer => Buffer.from(''))
      const publicEncryptSpy = jest.spyOn(crypto, 'publicEncrypt')
      sut.createToken(payload)
      expect(publicEncryptSpy).toHaveBeenCalledWith({
        key: publicKey,
        passphrase: '',
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, Buffer.from(payload))
    })

    test('Should return message encrypted', () => {
      const { sut } = makeSut()
      const jsonWebToken = Buffer.from(datatype.uuid())
      jest.spyOn(crypto, 'publicEncrypt').mockImplementationOnce(() => jsonWebToken)
      const result = sut.createToken(datatype.uuid())
      expect(result).toEqual(jsonWebToken.toString('base64'))
    })
  })
})
