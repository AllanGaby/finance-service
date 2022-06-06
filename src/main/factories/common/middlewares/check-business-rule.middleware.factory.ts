import { CheckBusinessRuleUseCase, CreateEntityDTO, EntityModel } from '@/domain/common'
import { CheckBusinessRuleMiddleware } from '@/presentation/common'

export const makeCheckBusinessRuleMiddleware = <EntityType extends EntityModel = EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>>(
  checkBusinessRuleUseCase: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): CheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType> =>
    new CheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType>(
      checkBusinessRuleUseCase
    )
