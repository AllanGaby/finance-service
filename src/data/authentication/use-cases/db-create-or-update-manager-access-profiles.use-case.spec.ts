import { DbCreateOrUpdateManagerAccessProfilesUseCase } from './db-create-or-update-manager-access-profiles.use-case'
import { CreateEntityUseCaseSpy, CustomFilterConditional, CustomFilterOperator, UpdateEntityByIdUseCaseSpy } from '@/domain/common'
import { AccessProfileModel, CreateAccessProfileDTO, mockAccessProfileModel, mockModuleAccessRuleModel, mockModuleModel, ModuleModel, RepositoryAccessProfileFilter, UpdateAccessProfileDTO } from '@/domain/authentication'
import { ListEntitiesRepositorySpy } from '@/protocols/repositories'
import { datatype } from 'faker'

type sutTypes = {
  sut: DbCreateOrUpdateManagerAccessProfilesUseCase
  listModulesRepository: ListEntitiesRepositorySpy<ModuleModel>
  listAccessProfileRepository: ListEntitiesRepositorySpy<AccessProfileModel>
  createAccessProfileUseCase: CreateEntityUseCaseSpy<AccessProfileModel, CreateAccessProfileDTO>
  updateAccessProfileUseCase: UpdateEntityByIdUseCaseSpy<AccessProfileModel, UpdateAccessProfileDTO>
}

const makeSut = (): sutTypes => {
  const listModulesRepository = new ListEntitiesRepositorySpy<ModuleModel>()
  const listAccessProfileRepository = new ListEntitiesRepositorySpy<AccessProfileModel>()
  const createAccessProfileUseCase = new CreateEntityUseCaseSpy<AccessProfileModel, CreateAccessProfileDTO>()
  const updateAccessProfileUseCase = new UpdateEntityByIdUseCaseSpy<AccessProfileModel, UpdateAccessProfileDTO>()
  const sut = new DbCreateOrUpdateManagerAccessProfilesUseCase(
    listModulesRepository,
    listAccessProfileRepository,
    createAccessProfileUseCase,
    updateAccessProfileUseCase
  )
  return {
    sut,
    listModulesRepository,
    listAccessProfileRepository,
    createAccessProfileUseCase,
    updateAccessProfileUseCase
  }
}

const mockModuleModelWithAccessRules = (length: number = datatype.number({ min: 2, max: 10 })): ModuleModel[] => {
  const muduleList: ModuleModel[] = []
  for (let index = 0; index < length; index++) {
    const module = mockModuleModel()
    module.access_rules = [
      mockModuleAccessRuleModel(),
      mockModuleAccessRuleModel(),
      mockModuleAccessRuleModel(),
      mockModuleAccessRuleModel()
    ]
    muduleList.push(module)
  }
  return muduleList
}

describe('DbCreateOrUpdateManagerAccessProfilesUseCase', () => {
  describe('Search modules', () => {
    test('Should call ListModulesRepository with correct values', async () => {
      const { sut, listModulesRepository } = makeSut()
      const listSpy = jest.spyOn(listModulesRepository, 'list')
      await sut.createOrUpdateAccessProfiles()
      expect(listSpy).toHaveBeenCalledWith()
    })
  })

  describe('Search AccessProfile for each module', () => {
    test('Should not call ListAccessProfileRepository if ListModulesRepository return a empty list', async () => {
      const { sut, listModulesRepository, listAccessProfileRepository } = makeSut()
      jest.spyOn(listModulesRepository, 'list').mockResolvedValue([])
      const listSpy = jest.spyOn(listAccessProfileRepository, 'list')
      await sut.createOrUpdateAccessProfiles()
      expect(listSpy).not.toHaveBeenCalled()
    })

    test('Should call ListAccessProfileRepository with correct value for each module', async () => {
      const moduleList: ModuleModel[] = mockModuleModelWithAccessRules()
      const { sut, listModulesRepository, listAccessProfileRepository } = makeSut()
      jest.spyOn(listModulesRepository, 'list').mockResolvedValue(moduleList)
      const listSpy = jest.spyOn(listAccessProfileRepository, 'list')
      await sut.createOrUpdateAccessProfiles()
      moduleList.forEach(module => {
        expect(listSpy).toHaveBeenCalledWith({
          filters: [{
            field: RepositoryAccessProfileFilter.ModuleId,
            conditional: CustomFilterConditional.equal,
            operator: CustomFilterOperator.and,
            value: module.id
          }, {
            field: RepositoryAccessProfileFilter.Key,
            conditional: CustomFilterConditional.equal,
            operator: CustomFilterOperator.and,
            value: `${module.module_key}_manager`
          }]
        })
      })
    })

    describe('Create new AccessProfile', () => {
      test('Should create a new AccessProfile with correct values if ListAccessProfileRepository return a empty list', async () => {
        const moduleList: ModuleModel[] = mockModuleModelWithAccessRules()
        const { sut, listModulesRepository, listAccessProfileRepository, createAccessProfileUseCase } = makeSut()
        const createSpy = jest.spyOn(createAccessProfileUseCase, 'create')
        jest.spyOn(listModulesRepository, 'list').mockResolvedValue(moduleList)
        jest.spyOn(listAccessProfileRepository, 'list').mockResolvedValue([])
        await sut.createOrUpdateAccessProfiles()
        moduleList.forEach(module => {
          const moduleAccessRuleList: string[] =
          module.access_rules?.map<string>(accessRule => accessRule.id)
          const accessProfileKey = `${module.module_key}_manager`
          const accessProfileName = `${module.name}(Administrador)`
          expect(createSpy).toHaveBeenCalledWith({
            access_profile_key: accessProfileKey,
            enabled: true,
            module_id: module.id,
            name: accessProfileName,
            rules_id: moduleAccessRuleList
          })
        })
      })
    })

    describe('Update a AccessProfile', () => {
      test('Should update a AccessProfile with correct values if ListAccessProfileRepository return a AccessProfile list', async () => {
        const moduleList: ModuleModel[] = mockModuleModelWithAccessRules()
        const expectedManagerAccessProfile = mockAccessProfileModel()
        const currentManagerAccessProfile: AccessProfileModel[] = [
          expectedManagerAccessProfile,
          mockAccessProfileModel(),
          mockAccessProfileModel()
        ]
        const { sut, listModulesRepository, listAccessProfileRepository, updateAccessProfileUseCase } = makeSut()
        const updateByIdSpy = jest.spyOn(updateAccessProfileUseCase, 'updateById')
        jest.spyOn(listModulesRepository, 'list').mockResolvedValue(moduleList)
        jest.spyOn(listAccessProfileRepository, 'list').mockResolvedValue(currentManagerAccessProfile)
        await sut.createOrUpdateAccessProfiles()
        moduleList.forEach(module => {
          const moduleAccessRuleList: string[] =
          module.access_rules?.map<string>(accessRule => accessRule.id)
          const accessProfileKey = `${module.module_key}_manager`
          const accessProfileName = `${module.name}(Administrador)`
          expect(updateByIdSpy).toHaveBeenCalledWith(expectedManagerAccessProfile.id, {
            access_profile_key: accessProfileKey,
            enabled: true,
            module_id: module.id,
            name: accessProfileName,
            rules_id: moduleAccessRuleList
          })
        })
      })
    })
  })
})
