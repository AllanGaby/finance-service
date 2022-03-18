import { BCryptAdapter } from './bcrypt.adapter'
import bcrypt from 'bcrypt'
import { datatype } from 'faker'

type sutTypes = {
  sut: BCryptAdapter
  salt: number
  payload: string
  hash: string
}

const makeSut = (): sutTypes => {
  const salt = datatype.number({ min: 1, max: 13 })
  const sut = new BCryptAdapter(salt)
  return {
    sut,
    salt,
    hash: datatype.uuid(),
    payload: datatype.string()
  }
}

describe('BCryptAdapter', () => {
  describe('Hash Method', () => {
    test('Should call hash with correct value', async () => {
      const { sut, salt, payload } = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.createHash(payload)
      expect(hashSpy).toHaveBeenCalledWith(payload, salt)
    })

    test('Shoudl return correct hash', async () => {
      const { sut, hash, payload } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce((_: string) => hash)
      const result = await sut.createHash(payload)
      expect(result).toBe(hash)
    })
  })

  describe('Compare Method', () => {
    test('Shoudl call compare with correct value', async () => {
      const { sut, payload, hash } = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compareHash(payload, hash)
      expect(compareSpy).toHaveBeenCalledWith(payload, hash)
    })

    test('Should return correct value if compare is succeeds', async () => {
      const { sut, payload, hash } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((_: string) => true)
      const result = await sut.compareHash(payload, hash)
      expect(result).toBeTruthy()
    })

    test('Should return correct value if compare is fails', async () => {
      const { sut, payload, hash } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce((_: string) => false)
      const result = await sut.compareHash(payload, hash)
      expect(result).toBeFalsy()
    })
  })
})
