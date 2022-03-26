import { DbUpdateAccessProfileByIdUseCase } from './db-update-access-profile-by-id.use-case'
import {
  AccessProfileModel,
  UpdateAccessProfileDTO,
  mockAccessProfileModel,
  mockUpdateAccessProfileDTO,
  RefreshAccessProfileRulesUseCaseSpy
} from '@/domain/authentication'
import { GetEntityByIdRepositorySpy, UpdateEntityRepositorySpy } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbUpdateAccessProfileByIdUseCase
  accessProfileId: string
  currentAccessProfile: AccessProfileModel
  updatedAccessProfile: AccessProfileModel
  updateAccessProfileDTO: UpdateAccessProfileDTO
  getAccessProfileByIdRepository: GetEntityByIdRepositorySpy<AccessProfileModel>
  updateAccessProfileByIdRepository: UpdateEntityRepositorySpy<AccessProfileModel>
  refreshAccessProfileRulesUseCase: RefreshAccessProfileRulesUseCaseSpy
}

const makeSut = (): sutTypes => {
  const updatedAccessProfile = mockAccessProfileModel()
  const currentAccessProfile = mockAccessProfileModel()
  const getAccessProfileByIdRepository = new GetEntityByIdRepositorySpy<AccessProfileModel>()
  jest.spyOn(getAccessProfileByIdRepository, 'getById').mockResolvedValue(currentAccessProfile)
  const updateAccessProfileByIdRepository = new UpdateEntityRepositorySpy<AccessProfileModel>()
  jest.spyOn(updateAccessProfileByIdRepository, 'update').mockResolvedValue(updatedAccessProfile)
  const refreshAccessProfileRulesUseCase = new RefreshAccessProfileRulesUseCaseSpy()
  const sut = new DbUpdateAccessProfileByIdUseCase(
    getAccessProfileByIdRepository,
    updateAccessProfileByIdRepository,
    refreshAccessProfileRulesUseCase
  )
  return {
    sut,
    updatedAccessProfile,
    currentAccessProfile,
    accessProfileId: datatype.uuid(),
    updateAccessProfileDTO: mockUpdateAccessProfileDTO(),
    getAccessProfileByIdRepository,
    updateAccessProfileByIdRepository,
    refreshAccessProfileRulesUseCase
  }
}

describe('DbUpdateAccessProfileByIdUseCase', () => {
  describe('Update AccessProfile', () => {
    test('Should call UpdateAccessProfileByIdRepository with correct values', async () => {
      const { sut, accessProfileId, updateAccessProfileDTO, updateAccessProfileByIdRepository, currentAccessProfile } = makeSut()
      const updateSpy = jest.spyOn(updateAccessProfileByIdRepository, 'update')
      await sut.updateById(accessProfileId, updateAccessProfileDTO)
      expect(updateSpy).toHaveBeenCalledWith({
        ...updateAccessProfileDTO,
        id: currentAccessProfile.id
      })
    })
  })

  describe('Refresh AccessProfileRules', () => {
    test('Should call RefreshAccessProfileRulesUseCase with correct values', async () => {
      const { sut, updateAccessProfileDTO, accessProfileId, refreshAccessProfileRulesUseCase, updatedAccessProfile } = makeSut()
      const refreshRulesSpy = jest.spyOn(refreshAccessProfileRulesUseCase, 'refreshRules')
      await sut.updateById(accessProfileId, updateAccessProfileDTO)
      expect(refreshRulesSpy).toHaveBeenCalledWith({
        access_profile_id: updatedAccessProfile.id,
        rules_id: updateAccessProfileDTO.rules_id
      })
    })
  })
})
