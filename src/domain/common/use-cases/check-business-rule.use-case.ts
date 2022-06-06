import { EntityModel, CreateEntityDTO, SettingsModel } from '@/domain/common'

export interface CheckBusinessRuleUseCase<EntityType extends EntityModel = EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>> {
  check: (params: CheckBusinessRuleDTOType, settings?: SettingsModel) => Promise<void>
}
