import { Node2FaAdapter } from './node-2fa.adapter'
import { mockCreateTwoFactorAuthenticationSecretDTO } from '@/protocols/two-factor-authentication'
import node2fa from 'node-2fa'
import { datatype } from 'faker'

const secret = datatype.uuid()
const token = datatype.uuid()
let isTokenEquals: boolean = true

jest.mock('node-2fa', () => ({
  generateSecret: () => { return { secret } },
  generateToken: () => { return { token } },
  verifyToken: () => { return { isTokenEquals } }
}))

type sutTypes = {
  sut: Node2FaAdapter
}

const makeSut = (): sutTypes => ({
  sut: new Node2FaAdapter()
})

describe('Node2FaAdapter', () => {
  describe('CreateSecret Method', () => {
    test('Should call GenerateSecret with correct values', () => {
      const { sut } = makeSut()
      const request = mockCreateTwoFactorAuthenticationSecretDTO()
      const generateSecretSpy = jest.spyOn(node2fa, 'generateSecret')
      sut.createSecret(request)
      expect(generateSecretSpy).toHaveBeenCalledWith({
        name: request.name,
        account: request.accountId
      })
    })

    test('Should return same GenerateSecret returns if succeeds', () => {
      const { sut } = makeSut()
      const result = sut.createSecret(mockCreateTwoFactorAuthenticationSecretDTO())
      expect(result).toBe(secret)
    })
  })

  describe('CreateToken Method', () => {
    test('Should call GenerateToken with correct value', () => {
      const { sut } = makeSut()
      const request = datatype.uuid()
      const generateTokenSpy = jest.spyOn(node2fa, 'generateToken')
      sut.createToken(request)
      expect(generateTokenSpy).toHaveBeenCalledWith(request)
    })

    test('Should return same GenerateToken returns if succeeds', () => {
      const { sut } = makeSut()
      const result = sut.createToken(datatype.uuid())
      expect(result).toBe(token)
    })
  })

  describe('TokenToken Method', () => {
    test('Should call VerifyToken with correct value', () => {
      const { sut } = makeSut()
      const secretToCompare = datatype.uuid()
      const tokenToCompare = datatype.uuid()
      const verifyTokenSpy = jest.spyOn(node2fa, 'verifyToken')
      sut.compareToken({
        secret: secretToCompare,
        token: tokenToCompare
      })
      expect(verifyTokenSpy).toHaveBeenCalledWith(
        secretToCompare,
        tokenToCompare,
        60
      )
    })

    test('Should return same VerifyToken returns if succeeds', () => {
      const { sut } = makeSut()
      isTokenEquals = datatype.boolean()
      jest.spyOn(node2fa, 'verifyToken').mockReturnValueOnce({ delta: isTokenEquals ? 0 : 1 })
      const result = sut.compareToken({
        secret: datatype.uuid(),
        token: datatype.uuid()
      })
      expect(result).toBe(isTokenEquals)
    })
  })
})
