import { DbCreateAccessProfileUseCase } from './db-create-access-profile.use-case'
import {
  AccessProfileModel,
  CreateAccessProfileDTO,
  mockAccessProfileModel,
  mockCreateAccessProfileDTO,
  RefreshAccessProfileRulesUseCaseSpy
} from '@/domain/authentication'
import { CreateEntityRepositorySpy } from '@/protocols/repositories'

type sutTypes = {
  sut: DbCreateAccessProfileUseCase
  createdAccessProfile: AccessProfileModel
  createAccessProfileDTO: CreateAccessProfileDTO
  createAccessProfileRepository: CreateEntityRepositorySpy<AccessProfileModel>
  refreshAccessProfileRulesUseCase: RefreshAccessProfileRulesUseCaseSpy
}

const makeSut = (): sutTypes => {
  const createdAccessProfile = mockAccessProfileModel()
  const createAccessProfileRepository = new CreateEntityRepositorySpy<AccessProfileModel>()
  jest.spyOn(createAccessProfileRepository, 'create').mockResolvedValue(createdAccessProfile)
  const refreshAccessProfileRulesUseCase = new RefreshAccessProfileRulesUseCaseSpy()
  const sut = new DbCreateAccessProfileUseCase(
    createAccessProfileRepository,
    refreshAccessProfileRulesUseCase
  )
  return {
    sut,
    createdAccessProfile,
    createAccessProfileDTO: mockCreateAccessProfileDTO(),
    createAccessProfileRepository,
    refreshAccessProfileRulesUseCase
  }
}

describe('DbCreateAccessProfileUseCase', () => {
  describe('Create a new AccessProfile', () => {
    test('Should call CreateAccessProfileRepository with correct values', async () => {
      const { sut, createAccessProfileDTO, createAccessProfileRepository } = makeSut()
      const createSpy = jest.spyOn(createAccessProfileRepository, 'create')
      await sut.create(createAccessProfileDTO)
      expect(createSpy).toHaveBeenCalledWith(createAccessProfileDTO)
    })
  })

  describe('Refresh AccessProfileRules', () => {
    test('Should call RefreshAccessProfileRulesUseCase with correct values', async () => {
      const { sut, createAccessProfileDTO, refreshAccessProfileRulesUseCase, createdAccessProfile } = makeSut()
      const refreshRulesSpy = jest.spyOn(refreshAccessProfileRulesUseCase, 'refreshRules')
      await sut.create(createAccessProfileDTO)
      expect(refreshRulesSpy).toHaveBeenCalledWith({
        access_profile_id: createdAccessProfile.id,
        rules_id: createAccessProfileDTO.rules_id
      })
    })
  })
})
