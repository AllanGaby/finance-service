import { DbRecoverPasswordUseCase } from './db-recover-password.use-case'
import { CustomFilterConditional, CustomFilterOperator } from '@/domain/common'
import { AccountModel, RequestRecoverPasswordModel, mockRecoverPasswordDTO, RecoverPasswordDTO, RepositoryRequestRecoverPasswordFilter, mockRequestRecoverPasswordModel } from '@/domain/authentication'
import { CompareHashProtocolSpy, CreateHashProtocolSpy } from '@/protocols/cryptography'
import { GetOneEntityRepositorySpy, SoftDeleteEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/protocols/repositories'
import { InvalidCredentialsError, CorruptedAccountError } from '@/data/authentication/errors'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbRecoverPasswordUseCase
  recoverPasswordDTO: RecoverPasswordDTO
  requestRecoverPassword: RequestRecoverPasswordModel
  getRequestRecoverPasswordRepository: GetOneEntityRepositorySpy<RequestRecoverPasswordModel>
  compareHashAdapter: CompareHashProtocolSpy
  createHashAdapter: CreateHashProtocolSpy
  updateAccountRepository: UpdateEntityRepositorySpy<AccountModel>
  deleteRequestRecoverPasswordRepository: SoftDeleteEntityByIdRepositorySpy<RequestRecoverPasswordModel>
}

const makeSut = (): sutTypes => {
  const requestRecoverPassword = mockRequestRecoverPasswordModel()
  const getRequestRecoverPasswordRepository = new GetOneEntityRepositorySpy<RequestRecoverPasswordModel>()
  jest.spyOn(getRequestRecoverPasswordRepository, 'getOne').mockResolvedValue(requestRecoverPassword)
  const compareHashAdapter = new CompareHashProtocolSpy()
  jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(true)
  const createHashAdapter = new CreateHashProtocolSpy()
  const updateAccountRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const deleteRequestRecoverPasswordRepository = new SoftDeleteEntityByIdRepositorySpy<RequestRecoverPasswordModel>()
  const sut = new DbRecoverPasswordUseCase(
    getRequestRecoverPasswordRepository,
    compareHashAdapter,
    createHashAdapter,
    updateAccountRepository,
    deleteRequestRecoverPasswordRepository
  )
  return {
    sut,
    recoverPasswordDTO: mockRecoverPasswordDTO(),
    requestRecoverPassword,
    getRequestRecoverPasswordRepository,
    compareHashAdapter,
    createHashAdapter,
    updateAccountRepository,
    deleteRequestRecoverPasswordRepository
  }
}

describe('DbRecoverPasswordUseCase', () => {
  describe('Search RequestRecoverPassword by ValidationCode', () => {
    test('Should call GetRequestRecoverPasswordRepository with correct values', async () => {
      const { sut, recoverPasswordDTO, getRequestRecoverPasswordRepository } = makeSut()
      const getOneSpy = jest.spyOn(getRequestRecoverPasswordRepository, 'getOne')
      await sut.update(recoverPasswordDTO)
      expect(getOneSpy).toHaveBeenCalledWith([{
        conditional: CustomFilterConditional.equal,
        field: RepositoryRequestRecoverPasswordFilter.ValidationCode,
        operator: CustomFilterOperator.and,
        value: recoverPasswordDTO.verification_code
      }])
    })

    test('Should return InvalidCredentialsError if GetRequestRecoverPasswordRepository return undefined', async () => {
      const { sut, recoverPasswordDTO, getRequestRecoverPasswordRepository } = makeSut()
      jest.spyOn(getRequestRecoverPasswordRepository, 'getOne').mockResolvedValue(undefined)
      const promise = sut.update(recoverPasswordDTO)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Check AccountHash', () => {
    test('Should call CompareHashAdapter with correct values', async () => {
      const { sut, recoverPasswordDTO, compareHashAdapter, requestRecoverPassword } = makeSut()
      const compareHashSpy = jest.spyOn(compareHashAdapter, 'compareHash')
      const { account } = requestRecoverPassword
      await sut.update(recoverPasswordDTO)
      expect(compareHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: account.name,
        email: account.email,
        identification: account.identification,
        password: account.password
      }), account.account_hash)
    })

    test('Should return CorruptedAccountError if CompareHashAdapter return false', async () => {
      const { sut, recoverPasswordDTO, compareHashAdapter } = makeSut()
      jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(false)
      const promise = sut.update(recoverPasswordDTO)
      await expect(promise).rejects.toThrowError(CorruptedAccountError)
    })
  })

  describe('Update Account', () => {
    test('Should call createHashAdapter with correct values to create passwordHash', async () => {
      const { sut, recoverPasswordDTO, createHashAdapter } = makeSut()
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      await sut.update(recoverPasswordDTO)
      expect(createHashSpy).toHaveBeenCalledWith(recoverPasswordDTO.password)
    })

    test('Should call createHashAdapter with correct values to create accountHash', async () => {
      const { sut, recoverPasswordDTO, createHashAdapter, requestRecoverPassword } = makeSut()
      const passwordHash = datatype.uuid()
      const { account } = requestRecoverPassword
      jest.spyOn(createHashAdapter, 'createHash').mockResolvedValueOnce(passwordHash)
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      await sut.update(recoverPasswordDTO)
      expect(createHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: account.name,
        email: account.email,
        identification: account.identification,
        password: passwordHash
      }))
    })

    test('Should call updateAccountRepository with correct values', async () => {
      const { sut, recoverPasswordDTO, createHashAdapter, requestRecoverPassword, updateAccountRepository } = makeSut()
      const updateSpy = jest.spyOn(updateAccountRepository, 'update')
      const passwordHash = datatype.uuid()
      const accountHash = datatype.uuid()
      jest.spyOn(createHashAdapter, 'createHash')
        .mockResolvedValueOnce(passwordHash)
        .mockResolvedValueOnce(accountHash)
      const { account } = requestRecoverPassword
      await sut.update(recoverPasswordDTO)
      expect(updateSpy).toHaveBeenCalledWith({
        id: account.id,
        password: passwordHash,
        account_hash: accountHash
      })
    })
  })

  describe('Delete RequestRecoverPassword', () => {
    test('Should call deleteRequestRecoverPasswordRepository with correct values', async () => {
      const { sut, recoverPasswordDTO, requestRecoverPassword, deleteRequestRecoverPasswordRepository } = makeSut()
      const softDeleteByIdSpy = jest.spyOn(deleteRequestRecoverPasswordRepository, 'softDeleteById')
      await sut.update(recoverPasswordDTO)
      expect(softDeleteByIdSpy).toHaveBeenCalledWith(requestRecoverPassword.id)
    })
  })
})
