import { DbCreateAccessSessionUseCase } from './db-create-access-session.use-case'
import { CustomFilterConditional, CustomFilterModel, CustomFilterOperator } from '@/domain/common'
import {
  AccessSessionModel,
  AccessSessionModuleModel,
  AccountModel,
  CreateAccessSessionDTO,
  mockAccessSessionModel,
  mockAccountAccessModuleModel,
  mockAccountModel,
  mockCreateAccessSessionDTO,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { InvalidCredentialsError, CorruptedAccountError } from '@/data/authentication/errors'
import { CreateCacheProtocolSpy } from '@/protocols/cache'
import { CompareHashProtocolSpy } from '@/protocols/cryptography'
import { CreateJsonWebTokenProtocolSpy } from '@/protocols/jwt'
import { CreateEntityRepositorySpy, GetOneEntityRepositorySpy } from '@/protocols/repositories'
import { EncryptRequestWithPublicKeyProtocolSpy } from '@/protocols/rsa'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateAccessSessionUseCase
  createAccessSessionDTO: CreateAccessSessionDTO
  authenticationAccount: AccountModel
  accessSession: AccessSessionModel
  getAccountRepository: GetOneEntityRepositorySpy<AccountModel>
  compareHashAdapter: CompareHashProtocolSpy
  createAccessSessionRepository: CreateEntityRepositorySpy<AccessSessionModel>
  createCacheAdapter: CreateCacheProtocolSpy
  encryptWithPublicKeyAdapter: EncryptRequestWithPublicKeyProtocolSpy
  createJWTAdapter: CreateJsonWebTokenProtocolSpy
}

const makeSut = (): sutTypes => {
  const authenticationAccount: AccountModel = mockAccountModel()
  authenticationAccount.modules = [
    mockAccountAccessModuleModel(),
    mockAccountAccessModuleModel(),
    mockAccountAccessModuleModel()
  ]
  const getAccountRepository = new GetOneEntityRepositorySpy<AccountModel>()
  jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(authenticationAccount)
  const compareHashAdapter = new CompareHashProtocolSpy()
  jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(true)
  const accessSession = mockAccessSessionModel()
  const createAccessSessionRepository = new CreateEntityRepositorySpy<AccessSessionModel>()
  jest.spyOn(createAccessSessionRepository, 'create').mockResolvedValue(accessSession)
  const createCacheAdapter = new CreateCacheProtocolSpy()
  const encryptWithPublicKeyAdapter = new EncryptRequestWithPublicKeyProtocolSpy()
  const createJWTAdapter = new CreateJsonWebTokenProtocolSpy()
  const sut = new DbCreateAccessSessionUseCase(
    getAccountRepository,
    compareHashAdapter,
    createAccessSessionRepository,
    createCacheAdapter,
    encryptWithPublicKeyAdapter,
    createJWTAdapter
  )
  return {
    sut,
    createAccessSessionDTO: mockCreateAccessSessionDTO(),
    authenticationAccount,
    accessSession,
    getAccountRepository,
    compareHashAdapter,
    createAccessSessionRepository,
    createCacheAdapter,
    encryptWithPublicKeyAdapter,
    createJWTAdapter
  }
}

describe('DbCreateAccessSessionUseCase', () => {
  describe('Search Account by Login', () => {
    test('Should call GetAccountRepository with correct values', async () => {
      const { sut, createAccessSessionDTO, getAccountRepository } = makeSut()
      const getOneSpy = jest.spyOn(getAccountRepository, 'getOne')
      const expectedFilter: CustomFilterModel[] = [{
        field: RepositoryAccountFilter.Email,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.or,
        value: createAccessSessionDTO.login
      }, {
        field: RepositoryAccountFilter.Identification,
        conditional: CustomFilterConditional.equal,
        operator: CustomFilterOperator.or,
        value: createAccessSessionDTO.login
      }]
      await sut.create(createAccessSessionDTO)
      expect(getOneSpy).toHaveBeenCalledWith(expectedFilter)
    })

    test('Should return InvalidCredentialsError if GetAccountRepository return undefined', async () => {
      const { sut, createAccessSessionDTO, getAccountRepository } = makeSut()
      jest.spyOn(getAccountRepository, 'getOne').mockResolvedValue(undefined)
      const promise = sut.create(createAccessSessionDTO)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Check Password', () => {
    test('Should call CompareHashAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, compareHashAdapter, authenticationAccount } = makeSut()
      const compareHashSpy = jest.spyOn(compareHashAdapter, 'compareHash')
      await sut.create(createAccessSessionDTO)
      expect(compareHashSpy).toHaveBeenCalledWith(createAccessSessionDTO.password, authenticationAccount.password)
    })

    test('Should return InvalidCredentialsError if CompareHashAdapter return false', async () => {
      const { sut, createAccessSessionDTO, compareHashAdapter } = makeSut()
      jest.spyOn(compareHashAdapter, 'compareHash').mockResolvedValue(false)
      const promise = sut.create(createAccessSessionDTO)
      await expect(promise).rejects.toThrowError(InvalidCredentialsError)
    })
  })

  describe('Check Account Hash', () => {
    test('Should call CompareHashAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, compareHashAdapter, authenticationAccount } = makeSut()
      const compareHashSpy = jest.spyOn(compareHashAdapter, 'compareHash')
      await sut.create(createAccessSessionDTO)
      expect(compareHashSpy).toHaveBeenCalledWith(JSON.stringify({
        name: authenticationAccount.name,
        email: authenticationAccount.email,
        identification: authenticationAccount.identification,
        password: authenticationAccount.password
      }), authenticationAccount.account_hash)
    })

    test('Should return InvalidCredentialsError if CompareHashAdapter return false', async () => {
      const { sut, createAccessSessionDTO, compareHashAdapter } = makeSut()
      jest.spyOn(compareHashAdapter, 'compareHash')
        .mockResolvedValueOnce(true)
        .mockResolvedValue(false)
      const promise = sut.create(createAccessSessionDTO)
      await expect(promise).rejects.toThrowError(CorruptedAccountError)
    })
  })

  describe('Create a AccessSession', () => {
    test('Should call CreateAccessSessionRepository with correct value', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, createAccessSessionRepository } = makeSut()
      const createSpy = jest.spyOn(createAccessSessionRepository, 'create')
      const modules: AccessSessionModuleModel = {}
      authenticationAccount.modules.forEach(module => {
        const accessProfile = module.access_profile
        const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
        modules[accessProfile.module.module_key] = {
          access_profile_key: accessProfile.access_profile_key,
          access_profile_rules: moduleAcessRuleKeys
        }
      })
      await sut.create(createAccessSessionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        account_id: authenticationAccount.id,
        access_session_modules: JSON.stringify(modules)
      })
    })

    test('Should call CreateCacheAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, createCacheAdapter, accessSession } = makeSut()
      const createSpy = jest.spyOn(createCacheAdapter, 'create')
      const modules: AccessSessionModuleModel = {}
      authenticationAccount.modules.forEach(module => {
        const accessProfile = module.access_profile
        const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
        modules[accessProfile.module.module_key] = {
          access_profile_key: accessProfile.access_profile_key,
          access_profile_rules: moduleAcessRuleKeys
        }
      })
      await sut.create(createAccessSessionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        key: `session:${authenticationAccount.id}:${accessSession.id}`,
        record: {
          session_id: accessSession.id,
          account_id: authenticationAccount.id,
          account_name: authenticationAccount.name,
          modules: modules
        }
      })
    })
  })

  describe('Create JWT', () => {
    test('Should call EncryptWithPublicKeyAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, accessSession, encryptWithPublicKeyAdapter } = makeSut()
      const createTokenSpy = jest.spyOn(encryptWithPublicKeyAdapter, 'createToken')
      await sut.create(createAccessSessionDTO)
      expect(createTokenSpy).toHaveBeenCalledWith(JSON.stringify({
        session_id: accessSession.id,
        account_id: authenticationAccount.id
      }))
    })

    test('Should call CreateJWTAdapter with correct value to create accessToken', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, encryptWithPublicKeyAdapter, createJWTAdapter } = makeSut()
      const createJWTSpy = jest.spyOn(createJWTAdapter, 'createJWT')
      const accessSessionToken = datatype.uuid()
      jest.spyOn(encryptWithPublicKeyAdapter, 'createToken').mockReturnValue(accessSessionToken)
      await sut.create(createAccessSessionDTO)
      expect(createJWTSpy).toHaveBeenCalledWith({
        payload: {
          access_token: accessSessionToken
        },
        subject: authenticationAccount.id
      }, '10m')
    })

    test('Should call CreateJWTAdapter with correct value to create refreshToken', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, encryptWithPublicKeyAdapter, createJWTAdapter } = makeSut()
      const createJWTSpy = jest.spyOn(createJWTAdapter, 'createJWT')
      const accessSessionToken = datatype.uuid()
      jest.spyOn(encryptWithPublicKeyAdapter, 'createToken').mockReturnValue(accessSessionToken)
      await sut.create(createAccessSessionDTO)
      expect(createJWTSpy).toHaveBeenCalledWith({
        payload: {
          access_token: accessSessionToken
        },
        subject: authenticationAccount.id
      }, '168h')
    })
  })

  describe('Return correct values', () => {
    test('Should return correct value', async () => {
      const { sut, createAccessSessionDTO, authenticationAccount, accessSession, createJWTAdapter } = makeSut()
      const modules: AccessSessionModuleModel = {}
      authenticationAccount.modules.forEach(module => {
        const accessProfile = module.access_profile
        const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
        modules[accessProfile.module.module_key] = {
          access_profile_key: accessProfile.access_profile_key,
          access_profile_rules: moduleAcessRuleKeys
        }
      })
      const accessToken = datatype.uuid()
      const refreshToken = datatype.uuid()
      jest.spyOn(createJWTAdapter, 'createJWT')
        .mockResolvedValueOnce(accessToken)
        .mockResolvedValueOnce(refreshToken)
      const response = await sut.create(createAccessSessionDTO)
      expect(response).toEqual({
        session_id: accessSession.id,
        account_id: authenticationAccount.id,
        account_name: authenticationAccount.name,
        modules: modules,
        access_token: accessToken,
        refresh_token: refreshToken
      })
    })
  })
})
