import { DbGetCurrentSettingsUseCase } from './db-get-current-settings.use-case'
import { CustomFilterConditional, CustomFilterOperator, mockSettingsModel, SettingsModel } from '@/domain/common'
import { GetOneEntityRepositorySpy } from '@/protocols/repositories'

type sutTypes = {
  sut: DbGetCurrentSettingsUseCase
  getOneEntityRepository: GetOneEntityRepositorySpy<SettingsModel>
}

const makeSut = (): sutTypes => {
  const getOneEntityRepository = new GetOneEntityRepositorySpy<SettingsModel>()
  const sut = new DbGetCurrentSettingsUseCase(getOneEntityRepository)
  return {
    sut,
    getOneEntityRepository
  }
}

describe('DbGetCurrentSettingsUseCase', () => {
  test('Should call getOneEntityRepository with correct value', async () => {
    const { sut, getOneEntityRepository } = makeSut()
    const getOneSpy = jest.spyOn(getOneEntityRepository, 'getOne')
    await sut.getCurrentSettings()
    expect(getOneSpy).toHaveBeenCalledWith([{
      field: 'deleted_at',
      conditional: CustomFilterConditional.isEmpty,
      operator: CustomFilterOperator.and,
      value: undefined
    }])
  })

  test('Should fails if getOneEntityRepository fails', async () => {
    const { sut, getOneEntityRepository } = makeSut()
    jest.spyOn(getOneEntityRepository, 'getOne').mockRejectedValue(new Error())
    const promise = sut.getCurrentSettings()
    await expect(promise).rejects.toThrow()
  })

  test('Should return same getOneEntityRepository returns', async () => {
    const { sut, getOneEntityRepository } = makeSut()
    const settings = mockSettingsModel()
    jest.spyOn(getOneEntityRepository, 'getOne').mockResolvedValue(settings)
    const result = await sut.getCurrentSettings()
    expect(result).toEqual(settings)
  })
})
