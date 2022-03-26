import { DbCreateAccountUseCase } from './db-create-account.use-case'
import { AccountModel, CreateAccountDTO, mockAccountModel, mockCreateAccountDTO, RepositoryAccountFilter } from '@/domain/authentication'
import { CreateHashProtocolSpy } from '@/protocols/cryptography'
import { CreateEntityRepositorySpy, GetOneEntityRepositorySpy } from '@/protocols/repositories'
import { CustomFilterConditional, CustomFilterModel, CustomFilterOperator } from '@/domain/common'
import { EntityAlreadyExistsError } from '@/data/common/errors'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateAccountUseCase
  createAccountDTO: CreateAccountDTO
  createAccountRepository: CreateEntityRepositorySpy<AccountModel>
  getAccountRepository: GetOneEntityRepositorySpy<AccountModel>
  createHashAdapter: CreateHashProtocolSpy
}

const makeSut = (): sutTypes => {
  const createAccountRepository = new CreateEntityRepositorySpy<AccountModel>()
  const getAccountRepository = new GetOneEntityRepositorySpy<AccountModel>()
  const createHashAdapter = new CreateHashProtocolSpy()
  const sut = new DbCreateAccountUseCase(
    createAccountRepository,
    getAccountRepository,
    createHashAdapter
  )
  return {
    sut,
    createAccountDTO: mockCreateAccountDTO(),
    createAccountRepository,
    getAccountRepository,
    createHashAdapter
  }
}

describe('DbCreateAccountUseCase', () => {
  describe('Search other account with same e-mail', () => {
    test('Should call GetAccountRepository with correct values', async () => {
      const { sut, createAccountDTO, getAccountRepository } = makeSut()
      const expectedFilter: CustomFilterModel[] = [{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.and,
        value: createAccountDTO.email
      }]
      const getOneSpy = jest.spyOn(getAccountRepository, 'getOne')
      await sut.create(createAccountDTO)
      expect(getOneSpy).toHaveBeenCalledWith(expectedFilter)
    })

    test('Should return EntityAlreadyExistsError if GetAccountRepository return any value', async () => {
      const { sut, createAccountDTO, getAccountRepository } = makeSut()
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(mockAccountModel())
      const promise = sut.create(createAccountDTO)
      await expect(promise).rejects.toThrowError(EntityAlreadyExistsError)
    })
  })

  describe('Create a Password Hash', () => {
    test('Should call CreateHashAdapter with correct value', async () => {
      const { sut, createAccountDTO, createHashAdapter } = makeSut()
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      await sut.create(createAccountDTO)
      expect(createHashSpy).toHaveBeenCalledWith(createAccountDTO.password)
    })
  })

  describe('Create a Account Hash', () => {
    test('Should call CreateHashAdapter with correct value', async () => {
      const { sut, createAccountDTO, createHashAdapter } = makeSut()
      const passwordHash = datatype.uuid()
      jest.spyOn(createHashAdapter, 'createHash').mockResolvedValueOnce(passwordHash)
      const createHashSpy = jest.spyOn(createHashAdapter, 'createHash')
      await sut.create(createAccountDTO)
      expect(createHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: createAccountDTO.name,
        email: createAccountDTO.email,
        identification: createAccountDTO.identification,
        password: passwordHash
      }))
    })
  })

  describe('Create a new Account', () => {
    test('Should call CreateAccountRepository with correct values', async () => {
      const { sut, createAccountDTO, createHashAdapter, createAccountRepository } = makeSut()
      const passwordHash = datatype.uuid()
      const accountHash = datatype.uuid()
      jest.spyOn(createHashAdapter, 'createHash')
        .mockResolvedValueOnce(passwordHash)
        .mockResolvedValueOnce(accountHash)
      const createSpy = jest.spyOn(createAccountRepository, 'create')
      await sut.create(createAccountDTO)
      expect(createSpy).toHaveBeenCalledWith({
        name: createAccountDTO.name,
        email: createAccountDTO.email,
        identification: createAccountDTO.identification,
        password: passwordHash,
        account_hash: accountHash
      })
    })
  })

  describe('Return a new Account', () => {
    test('Should return same CreateAccountRepository returns', async () => {
      const { sut, createAccountDTO, createAccountRepository } = makeSut()
      const createdAccount = mockAccountModel()
      jest.spyOn(createAccountRepository, 'create').mockResolvedValue(createdAccount)
      const response = await sut.create(createAccountDTO)
      expect(response).toEqual(createdAccount)
    })
  })
})
