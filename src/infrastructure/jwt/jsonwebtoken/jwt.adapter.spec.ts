import { JWTAdapter } from './jwt.adapter'
import { CreateJsonWebTokenDTO, JsonWebTokenModel, mockJsonWebTokenModel, mockCreateJsonWebTokenDTO } from '@/protocols/jwt'
import { datatype } from 'faker'
import jsonwebtoken from 'jsonwebtoken'

jest.mock('jsonwebtoken')

type sutTypes = {
  sut: JWTAdapter
  secret: string
  createJsonWebTokenDTO: CreateJsonWebTokenDTO
  jsonWebToken: JsonWebTokenModel
}

const makeSut = (): sutTypes => {
  const secret = datatype.uuid()
  const sut = new JWTAdapter(secret)
  return {
    sut,
    secret,
    createJsonWebTokenDTO: mockCreateJsonWebTokenDTO(),
    jsonWebToken: mockJsonWebTokenModel()
  }
}

describe('JWTAdapter', () => {
  describe('CreateJWT Method', () => {
    test('Should call sign with correct value', async () => {
      const { sut, secret, createJsonWebTokenDTO } = makeSut()
      const expiresIn = `${datatype.number({ min: 1, max: 30 })}d`
      const signSpy = jest.spyOn(jsonwebtoken, 'sign')
      await sut.createJWT(createJsonWebTokenDTO, expiresIn)
      expect(signSpy).toHaveBeenCalledWith(createJsonWebTokenDTO.payload, secret, {
        subject: createJsonWebTokenDTO.subject,
        expiresIn
      })
    })

    test('Should return correct value', async () => {
      const { sut, createJsonWebTokenDTO } = makeSut()
      const token = datatype.uuid()
      const expiresIn = `${datatype.number({ min: 1, max: 30 })}d`
      jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce((payload: string, secret: string): string => { return token })
      const result = await sut.createJWT(createJsonWebTokenDTO, expiresIn)
      expect(result).toBe(token)
    })
  })

  describe('ParseJWT Method', () => {
    test('Should call verify with correct value', async () => {
      const { sut, secret, jsonWebToken } = makeSut()
      jest.spyOn(jsonwebtoken, 'verify')
        .mockImplementationOnce((token: string, secret: string): object => { return { ...jsonWebToken.payload, sub: jsonWebToken.subject } })
      const verifySpy = jest.spyOn(jsonwebtoken, 'verify')
      const token = datatype.uuid()
      await sut.parseJWT(token)
      expect(verifySpy).toHaveBeenCalledWith(token, secret)
    })

    test('Should decrypted value', async () => {
      const { sut, jsonWebToken } = makeSut()
      jest.spyOn(jsonwebtoken, 'verify').mockImplementationOnce((token: string, secret: string): object => { return { ...jsonWebToken.payload, sub: jsonWebToken.subject } })
      const decrypted = await sut.parseJWT(datatype.uuid())
      expect(decrypted.subject).toBe(jsonWebToken.subject)
      expect(decrypted.payload).toEqual({ ...jsonWebToken.payload })
    })
  })
})
