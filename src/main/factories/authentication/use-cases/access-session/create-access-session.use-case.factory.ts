import { CreateEntityUseCase } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionDTO } from '@/domain/authentication'
import { DbCreateAccessSessionUseCase } from '@/data/authentication/use-cases'
import { CreateEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccessSessionEntity, AccessSessionRepositorySettings } from '@/infrastructure/authentication'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'
import { RSAFactory, RSAConfig } from '@/infrastructure/rsa'
import { JWTFactory } from '@/infrastructure/jwt'

export type CreateAccessSessionUseCaseProps =
CommonUseCaseProps &
CacheConfigurationModel &
RSAConfig & {
  secret: string
}

export const makeCreateAccessSessionUseCase = (props: CreateAccessSessionUseCaseProps): CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO> =>
  new DbCreateAccessSessionUseCase(
    CommonRepositoryFactory.getRepository<AccessSessionEntity, CreateEntityRepository<AccessSessionEntity>>(props.repositoryType, AccessSessionEntity, AccessSessionRepositorySettings),
    CacheFactory.getCacheAdapter(props),
    RSAFactory.getRSAAdapter(props),
    JWTFactory.GetJWTAdapter(props.secret)
  )
