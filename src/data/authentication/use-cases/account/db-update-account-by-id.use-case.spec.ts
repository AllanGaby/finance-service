import { DbUpdateaccountByIdUseCase } from './db-update-account-by-id.use-case'
import { UpdateAccountDTO, mockUpdateAccountDTO, AccountModel, mockAccountModel } from '@/domain/authentication'
import { CreateHashProtocolSpy } from '@/protocols/cryptography'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbUpdateaccountByIdUseCase
  accountId: string
  updateAccountDTO: UpdateAccountDTO
  updatedAccount: AccountModel
  getAccountByIdRepository: GetEntityByIdRepositorySpy<AccountModel>
  createHashAdapter: CreateHashProtocolSpy
  updateAccountRepository: UpdateEntityRepositorySpy<AccountModel>
}

const makeSut = (): sutTypes => {
  const updatedAccount = mockAccountModel()
  const getAccountByIdRepository = new GetEntityByIdRepositorySpy<AccountModel>()
  jest.spyOn(getAccountByIdRepository, 'getById').mockResolvedValue(updatedAccount)
  const createHashAdapter = new CreateHashProtocolSpy()
  const updateAccountRepository = new UpdateEntityRepositorySpy<AccountModel>()
  const sut = new DbUpdateaccountByIdUseCase(
    getAccountByIdRepository,
    createHashAdapter,
    updateAccountRepository
  )
  return {
    sut,
    accountId: datatype.uuid(),
    updateAccountDTO: mockUpdateAccountDTO(),
    updatedAccount,
    getAccountByIdRepository,
    createHashAdapter,
    updateAccountRepository
  }
}

describe('DbUpdateaccountByIdUseCase', () => {
  describe('Search Account By Id', () => {
    test('Should call getAccountByIdRepository with correct value', async () => {
      const { sut, accountId, updateAccountDTO, getAccountByIdRepository } = makeSut()
      const getByIdSpy = jest.spyOn(getAccountByIdRepository, 'getById')
      await sut.updateById(accountId, updateAccountDTO)
      expect(getByIdSpy).toHaveBeenCalledWith(accountId)
    })

    test('Should return EntityIsNotFoundError if getAccountByIdRepository return undefined', async () => {
      const { sut, accountId, updateAccountDTO, getAccountByIdRepository } = makeSut()
      jest.spyOn(getAccountByIdRepository, 'getById').mockResolvedValue(undefined)
      const promise = sut.updateById(accountId, updateAccountDTO)
      await expect(promise).rejects.toThrowError(EntityIsNotFoundError)
    })
  })

  describe('Create new Account Hash', () => {
    test('Should call createHashAdapter with correct values', async () => {
      const { sut, accountId, updateAccountDTO, createHashAdapter, updatedAccount } = makeSut()
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      await sut.updateById(accountId, updateAccountDTO)
      expect(createHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: updateAccountDTO.name,
        email: updatedAccount.email,
        identification: updatedAccount.identification,
        password: updatedAccount.password
      }))
    })
  })

  describe('Update Account', () => {
    test('Should call updateAccountRepository with correct values', async () => {
      const { sut, accountId, updateAccountDTO, createHashAdapter, updatedAccount, updateAccountRepository } = makeSut()
      const accountHash = datatype.uuid()
      jest.spyOn(createHashAdapter, 'createHash').mockResolvedValue(accountHash)
      const updateSpy = jest.spyOn(updateAccountRepository, 'update')
      await sut.updateById(accountId, updateAccountDTO)
      expect(updateSpy).toHaveBeenCalledWith({
        id: updatedAccount.id,
        name: updateAccountDTO.name,
        account_hash: accountHash
      })
    })
  })
})
