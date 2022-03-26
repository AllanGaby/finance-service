import { CreateEntityUseCase } from '@/domain/common'
import { AccessProfileModel, CreateAccessProfileDTO } from '@/domain/authentication'
import { DbCreateAccessProfileUseCase } from '@/data/authentication/use-cases'
import { CreateEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccessProfileEntity } from '@/infrastructure/authentication'
import { RefreshAccessProfileUseCaseProps, makeRefreshAccessProfileAccessRulesUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessProfileUseCaseProps =
CommonUseCaseProps &
RefreshAccessProfileUseCaseProps

export const makeCreateAccessProfileUseCase = (props: CreateAccessProfileUseCaseProps): CreateEntityUseCase<AccessProfileModel, CreateAccessProfileDTO> =>
  new DbCreateAccessProfileUseCase(
    CommonRepositoryFactory.getRepository<AccessProfileEntity, CreateEntityRepository<AccessProfileEntity>>(props.repositoryType, AccessProfileEntity, props.repositorySettings),
    makeRefreshAccessProfileAccessRulesUseCase(props)
  )
