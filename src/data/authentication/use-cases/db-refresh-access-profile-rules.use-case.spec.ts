import { DbRefreshAccessProfileRulesUseCase } from './db-refresh-access-profile-rules.use-case'
import { CreateEntityDTO, CustomFilterConditional } from '@/domain/common'
import {
  AccessProfileRuleModel,
  mockAccessProfileRuleModel,
  mockRefreshAccessProfileRulesDTO,
  RefreshAccessProfileRulesDTO,
  RepositoryAccessProfileRuleFilter
} from '@/domain/authentication'
import {
  CreateEntityInBulkRepositorySpy,
  DeleteEntitiesByListIdRepositorySpy,
  ListEntitiesRepositorySpy
} from '@/protocols/repositories'

type sutTypes = {
  sut: DbRefreshAccessProfileRulesUseCase
  currentAccessProfileRulesList: AccessProfileRuleModel[]
  refreshAccessProfileRulesDTO: RefreshAccessProfileRulesDTO
  listAccessProfileRulesRepository: ListEntitiesRepositorySpy<AccessProfileRuleModel>
  deleteAccessProfileRulesRepository: DeleteEntitiesByListIdRepositorySpy<AccessProfileRuleModel>
  createAccessProfileRuleRepository: CreateEntityInBulkRepositorySpy<AccessProfileRuleModel>
}

const makeSut = (): sutTypes => {
  const currentAccessProfileRulesList: AccessProfileRuleModel[] = [
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel(),
    mockAccessProfileRuleModel()
  ]
  const listAccessProfileRulesRepository = new ListEntitiesRepositorySpy<AccessProfileRuleModel>()
  jest.spyOn(listAccessProfileRulesRepository, 'list').mockResolvedValue(currentAccessProfileRulesList)
  const deleteAccessProfileRulesRepository = new DeleteEntitiesByListIdRepositorySpy<AccessProfileRuleModel>()
  const createAccessProfileRuleRepository = new CreateEntityInBulkRepositorySpy<AccessProfileRuleModel>()
  const sut = new DbRefreshAccessProfileRulesUseCase(
    listAccessProfileRulesRepository,
    deleteAccessProfileRulesRepository,
    createAccessProfileRuleRepository
  )
  return {
    sut,
    refreshAccessProfileRulesDTO: mockRefreshAccessProfileRulesDTO(),
    currentAccessProfileRulesList,
    listAccessProfileRulesRepository,
    deleteAccessProfileRulesRepository,
    createAccessProfileRuleRepository
  }
}

describe('DbRefreshAccessProfileRulesUseCase', () => {
  describe('Search current AccessProfileRules', () => {
    test('Should call ListAccessProfileRulesRepository with correct values', async () => {
      const { sut, refreshAccessProfileRulesDTO, listAccessProfileRulesRepository } = makeSut()
      const listSpy = jest.spyOn(listAccessProfileRulesRepository, 'list')
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(listSpy).toHaveBeenCalledWith({
        filters: [{
          field: RepositoryAccessProfileRuleFilter.AccessProfileId,
          conditional: CustomFilterConditional.equal,
          value: refreshAccessProfileRulesDTO.access_profile_id
        }]
      })
    })
  })

  describe('Delete AccessProfileRules not found in request', () => {
    test('Should call DeleteAccessProfileRulesRepository with ids not found in current access profile rules', async () => {
      const { sut, refreshAccessProfileRulesDTO, deleteAccessProfileRulesRepository, currentAccessProfileRulesList } = makeSut()
      const deleteByListIdSpy = jest.spyOn(deleteAccessProfileRulesRepository, 'deleteByListId')
      currentAccessProfileRulesList[0].module_access_rule_id = refreshAccessProfileRulesDTO.rules_id[0]
      const deleteListId: string[] = []
      currentAccessProfileRulesList.forEach(accessProfileRule => {
        if (!refreshAccessProfileRulesDTO.rules_id.includes(accessProfileRule.module_access_rule_id)) {
          deleteListId.push(accessProfileRule.id)
        }
      })
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(deleteByListIdSpy).toHaveBeenCalledWith(deleteListId)
    })

    test('Should not call DeleteAccessProfileRulesRepository if request has all ListAccessProfileRulesRepository returned', async () => {
      const { sut, refreshAccessProfileRulesDTO, deleteAccessProfileRulesRepository, currentAccessProfileRulesList } = makeSut()
      const deleteByListIdSpy = jest.spyOn(deleteAccessProfileRulesRepository, 'deleteByListId')
      refreshAccessProfileRulesDTO.rules_id = currentAccessProfileRulesList.map<string>(accessProfileRule => accessProfileRule.module_access_rule_id)
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(deleteByListIdSpy).not.toHaveBeenCalled()
    })
  })

  describe('Create new AccessProfileRules', () => {
    test('Should not call CreateAccessProfileRuleRepository if request has same ListAccessProfileRulesRepository returns', async () => {
      const { sut, refreshAccessProfileRulesDTO, createAccessProfileRuleRepository, currentAccessProfileRulesList } = makeSut()
      const createInBulkSpy = jest.spyOn(createAccessProfileRuleRepository, 'createInBulk')
      refreshAccessProfileRulesDTO.rules_id = currentAccessProfileRulesList.map<string>(accessProfileRule => accessProfileRule.module_access_rule_id)
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(createInBulkSpy).not.toHaveBeenCalled()
    })

    test('Should call CreateAccessProfileRuleRepository to each accessProfileRule in request if ListAccessProfileRulesRepository return a empty list', async () => {
      const { sut, refreshAccessProfileRulesDTO, createAccessProfileRuleRepository, listAccessProfileRulesRepository } = makeSut()
      jest.spyOn(listAccessProfileRulesRepository, 'list').mockResolvedValue([])
      const createInBulkSpy = jest.spyOn(createAccessProfileRuleRepository, 'createInBulk')
      const createAccessProfileRuleList: Array<CreateEntityDTO<AccessProfileRuleModel>> = []
      refreshAccessProfileRulesDTO.rules_id.forEach(ruleId => {
        createAccessProfileRuleList.push({
          access_profile_id: refreshAccessProfileRulesDTO.access_profile_id,
          module_access_rule_id: ruleId
        })
      })
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(createInBulkSpy).toHaveBeenCalledWith(createAccessProfileRuleList)
    })
  })

  describe('Return new AccessProfileRules', () => {
    test('Should call ListAccessProfileRulesRepository with correct values', async () => {
      const { sut, refreshAccessProfileRulesDTO, listAccessProfileRulesRepository } = makeSut()
      const listSpy = jest.spyOn(listAccessProfileRulesRepository, 'list')
      await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(listSpy).toHaveBeenNthCalledWith(2, {
        filters: [{
          field: RepositoryAccessProfileRuleFilter.AccessProfileId,
          conditional: CustomFilterConditional.equal,
          value: refreshAccessProfileRulesDTO.access_profile_id
        }]
      })
    })

    test('Should call ListAccessProfileRulesRepository with correct values', async () => {
      const { sut, refreshAccessProfileRulesDTO, listAccessProfileRulesRepository, currentAccessProfileRulesList } = makeSut()
      const newAccessProfileRulesList: AccessProfileRuleModel[] = [
        mockAccessProfileRuleModel(),
        mockAccessProfileRuleModel(),
        mockAccessProfileRuleModel(),
        mockAccessProfileRuleModel()
      ]
      jest.spyOn(listAccessProfileRulesRepository, 'list')
        .mockResolvedValueOnce(currentAccessProfileRulesList)
        .mockResolvedValueOnce(newAccessProfileRulesList)
      const response = await sut.refreshRules(refreshAccessProfileRulesDTO)
      expect(response).toEqual(newAccessProfileRulesList)
    })
  })
})
