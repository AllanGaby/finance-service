import { CustomFilterConditional, CustomFilterOperator, GetCurrentSettingsUseCase, SettingsModel } from '@/domain/common'
import { GetOneEntityRepository } from '@/protocols/repositories'

export class DbGetCurrentSettingsUseCase implements GetCurrentSettingsUseCase {
  constructor (
    private readonly getSettingsRepository: GetOneEntityRepository<SettingsModel>
  ) {}

  async getCurrentSettings (): Promise<SettingsModel> {
    return this.getSettingsRepository.getOne([{
      field: 'deleted_at',
      conditional: CustomFilterConditional.isEmpty,
      operator: CustomFilterOperator.and,
      value: undefined
    }])
  }
}
