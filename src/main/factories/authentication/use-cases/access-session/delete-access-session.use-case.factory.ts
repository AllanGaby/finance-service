import { DeleteAccessSessionUseCase } from '@/domain/authentication'
import { DbDeleteAccessSessionUseCase } from '@/data/authentication/use-cases'
import { SoftDeleteEntityByIdRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccessSessionEntity, AccessSessionRepositorySettings } from '@/infrastructure/authentication'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'

export type DeleteAccessSessionUseCaseProps =
CommonUseCaseProps &
CacheConfigurationModel

export const makeDeleteAccessSessionUseCase = (props: DeleteAccessSessionUseCaseProps): DeleteAccessSessionUseCase =>
  new DbDeleteAccessSessionUseCase(
    CacheFactory.getCacheAdapter(props),
    CommonRepositoryFactory.getRepository<AccessSessionEntity, SoftDeleteEntityByIdRepository<AccessSessionEntity>>(props.repositoryType, AccessSessionEntity, AccessSessionRepositorySettings)
  )
