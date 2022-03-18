import { UpdateEntityByIdUseCase } from '@/domain/common'
import { AccessProfileModel, UpdateAccessProfileDTO } from '@/domain/authentication'
import { DbUpdateAccessProfileByIdUseCase } from '@/data/authentication/use-cases'
import { GetEntityByIdRepository, UpdateEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccessProfileEntity } from '@/infrastructure/authentication'
import { RefreshAccessProfileUseCaseProps, makeRefreshAccessProfileAccessRulesUseCase } from '@/main/factories/authentication/use-cases'

export type UpdateAccessProfileByIdUseCaseProps =
CommonUseCaseProps &
RefreshAccessProfileUseCaseProps

export const makeUpdateAccessProfileByIdUseCase = (props: UpdateAccessProfileByIdUseCaseProps): UpdateEntityByIdUseCase<AccessProfileModel, UpdateAccessProfileDTO> =>
  new DbUpdateAccessProfileByIdUseCase(
    CommonRepositoryFactory.getRepository<AccessProfileEntity, GetEntityByIdRepository<AccessProfileEntity>>(props.repositoryType, AccessProfileEntity),
    CommonRepositoryFactory.getRepository<AccessProfileEntity, UpdateEntityRepository<AccessProfileEntity>>(props.repositoryType, AccessProfileEntity),
    makeRefreshAccessProfileAccessRulesUseCase(props)
  )
