import { DbCreateAccessSessionUseCase } from './db-create-access-session.use-case'
import {
  AccessSessionModel,
  AccessSessionModuleModel,
  CreateAccessSessionDTO,
  mockAccessSessionModel,
  mockAccountAccessModuleModel,
  mockCreateAccessSessionDTO
} from '@/domain/authentication'
import { CreateCacheProtocolSpy } from '@/protocols/cache'
import { CreateJsonWebTokenProtocolSpy } from '@/protocols/jwt'
import { CreateEntityRepositorySpy } from '@/protocols/repositories'
import { EncryptRequestWithPublicKeyProtocolSpy } from '@/protocols/rsa'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateAccessSessionUseCase
  createAccessSessionDTO: CreateAccessSessionDTO
  accessSession: AccessSessionModel
  createAccessSessionRepository: CreateEntityRepositorySpy<AccessSessionModel>
  createCacheAdapter: CreateCacheProtocolSpy
  encryptWithPublicKeyAdapter: EncryptRequestWithPublicKeyProtocolSpy
  createJWTAdapter: CreateJsonWebTokenProtocolSpy
}

const makeSut = (): sutTypes => {
  const createAccessSessionDTO = mockCreateAccessSessionDTO()
  createAccessSessionDTO.modules = [
    mockAccountAccessModuleModel(),
    mockAccountAccessModuleModel(),
    mockAccountAccessModuleModel()
  ]
  const accessSession = mockAccessSessionModel()
  const createAccessSessionRepository = new CreateEntityRepositorySpy<AccessSessionModel>()
  jest.spyOn(createAccessSessionRepository, 'create').mockResolvedValue(accessSession)
  const createCacheAdapter = new CreateCacheProtocolSpy()
  const encryptWithPublicKeyAdapter = new EncryptRequestWithPublicKeyProtocolSpy()
  const createJWTAdapter = new CreateJsonWebTokenProtocolSpy()
  const sut = new DbCreateAccessSessionUseCase(
    createAccessSessionRepository,
    createCacheAdapter,
    encryptWithPublicKeyAdapter,
    createJWTAdapter
  )
  return {
    sut,
    createAccessSessionDTO,
    accessSession,
    createAccessSessionRepository,
    createCacheAdapter,
    encryptWithPublicKeyAdapter,
    createJWTAdapter
  }
}

describe('DbCreateAccessSessionUseCase', () => {
  describe('Create a AccessSession', () => {
    test('Should call CreateAccessSessionRepository with correct value', async () => {
      const { sut, createAccessSessionDTO, createAccessSessionRepository } = makeSut()
      const createSpy = jest.spyOn(createAccessSessionRepository, 'create')
      const modules: AccessSessionModuleModel = {}
      createAccessSessionDTO.modules.forEach(module => {
        const accessProfile = module.access_profile
        const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
        modules[accessProfile.module.module_key] = {
          access_profile_key: accessProfile.access_profile_key,
          access_profile_rules: moduleAcessRuleKeys
        }
      })
      await sut.create(createAccessSessionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        account_id: createAccessSessionDTO.id,
        access_session_modules: JSON.stringify(modules),
        ip: createAccessSessionDTO.ip
      })
    })

    test('Should call CreateCacheAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, createCacheAdapter, accessSession } = makeSut()
      const createSpy = jest.spyOn(createCacheAdapter, 'create')
      const modules: AccessSessionModuleModel = {}
      createAccessSessionDTO.modules.forEach(module => {
        const accessProfile = module.access_profile
        const moduleAcessRuleKeys = accessProfile.module_access_rules.map<string>(moduleAccessRule => moduleAccessRule.rule_key)
        modules[accessProfile.module.module_key] = {
          access_profile_key: accessProfile.access_profile_key,
          access_profile_rules: moduleAcessRuleKeys
        }
      })
      await sut.create(createAccessSessionDTO)
      expect(createSpy).toHaveBeenCalledWith({
        key: `session:${createAccessSessionDTO.id}:${accessSession.id}`,
        record: {
          session_id: accessSession.id,
          account_id: createAccessSessionDTO.id,
          account_name: createAccessSessionDTO.name,
          modules: modules
        }
      })
    })
  })

  describe('Create JWT', () => {
    test('Should call EncryptWithPublicKeyAdapter with correct values', async () => {
      const { sut, createAccessSessionDTO, accessSession, encryptWithPublicKeyAdapter } = makeSut()
      const createTokenSpy = jest.spyOn(encryptWithPublicKeyAdapter, 'createToken')
      await sut.create(createAccessSessionDTO)
      expect(createTokenSpy).toHaveBeenCalledWith(JSON.stringify({
        session_id: accessSession.id,
        account_id: createAccessSessionDTO.id,
        ip: createAccessSessionDTO.ip
      }))
    })

    test('Should call CreateJWTAdapter with correct value to create accessToken', async () => {
      const { sut, createAccessSessionDTO, encryptWithPublicKeyAdapter, createJWTAdapter } = makeSut()
      const createJWTSpy = jest.spyOn(createJWTAdapter, 'createJWT')
      const accessSessionToken = datatype.uuid()
      jest.spyOn(encryptWithPublicKeyAdapter, 'createToken').mockReturnValue(accessSessionToken)
      await sut.create(createAccessSessionDTO)
      expect(createJWTSpy).toHaveBeenCalledWith({
        payload: {
          access_token: accessSessionToken
        },
        subject: createAccessSessionDTO.id
      }, '10m')
    })

    test('Should call CreateJWTAdapter with correct value to create refreshToken', async () => {
      const { sut, createAccessSessionDTO, encryptWithPublicKeyAdapter, createJWTAdapter } = makeSut()
      const createJWTSpy = jest.spyOn(createJWTAdapter, 'createJWT')
      const accessSessionToken = datatype.uuid()
      jest.spyOn(encryptWithPublicKeyAdapter, 'createToken').mockReturnValue(accessSessionToken)
      await sut.create(createAccessSessionDTO)
      expect(createJWTSpy).toHaveBeenCalledWith({
        payload: {
          access_token: accessSessionToken
        },
        subject: createAccessSessionDTO.id
      }, '168h')
    })
  })

  describe('Return correct values', () => {
    test('Should return correct value', async () => {
      const { sut, createAccessSessionDTO, accessSession, createJWTAdapter } = makeSut()
      const modules: AccessSessionModuleModel = {}
      createAccessSessionDTO.modules.forEach(module => {
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
        account_id: createAccessSessionDTO.id,
        account_name: createAccessSessionDTO.name,
        modules: modules,
        access_token: accessToken,
        refresh_token: refreshToken
      })
    })
  })
})
