import { RefreshAccessTokenUseCase } from '@/domain/authentication'
import { DbRefreshAccessTokenUseCase } from '@/data/authentication/use-cases'
import { GetEntityByIdRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import {
  CreateAccessSessionUseCaseProps,
  GetAccessSessionByTokenUseCaseProps,
  makeCreateAccessSessionUseCase,
  makeGetAccessSessionByTokenUseCase
} from '@/main/factories/authentication/use-cases'

export type RefreshAccessTokenUseCaseProps =
CommonUseCaseProps &
CreateAccessSessionUseCaseProps &
GetAccessSessionByTokenUseCaseProps &
CacheConfigurationModel

export const makeRefreshAccessTokenUseCase = (props: RefreshAccessTokenUseCaseProps): RefreshAccessTokenUseCase =>
  new DbRefreshAccessTokenUseCase(
    makeGetAccessSessionByTokenUseCase(props),
    CacheFactory.getCacheAdapter(props),
    CommonRepositoryFactory.getRepository<AccountEntity, GetEntityByIdRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    makeCreateAccessSessionUseCase(props)
  )
