import { CheckBusinessRuleUseCase, EntityModel, CreateEntityDTO } from '@/domain/common'

export class CheckBusinessRuleUseCaseSpy<EntityType extends EntityModel = EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>>
implements CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType> {
  params: CheckBusinessRuleDTOType

  async check (params: CheckBusinessRuleDTOType): Promise<void> {
    this.params = params
    return undefined
  }
}
