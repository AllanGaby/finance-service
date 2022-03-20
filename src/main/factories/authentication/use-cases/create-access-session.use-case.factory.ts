import { CreateEntityUseCase } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionDTO } from '@/domain/authentication'
import { DbCreateAccessSessionUseCase } from '@/data/authentication/use-cases'
import { GetOneEntityRepository, CreateEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity, AccessSessionEntity, AccountRepositorySettings, AccessSessionRepositorySettings } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'
import { RSAFactory, RSAConfig } from '@/infrastructure/rsa'
import { JWTFactory } from '@/infrastructure/jwt'

export type CreateAccessSessionUseCaseProps =
CommonUseCaseProps &
CacheConfigurationModel &
RSAConfig & {
  salt: number
  secret: string
}

export const makeCreateAccessSessionUseCase = (props: CreateAccessSessionUseCaseProps): CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO> =>
  new DbCreateAccessSessionUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, GetOneEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    CryptographyFactory.GetCryptographyAdapter(props.salt),
    CommonRepositoryFactory.getRepository<AccessSessionEntity, CreateEntityRepository<AccessSessionEntity>>(props.repositoryType, AccessSessionEntity, AccessSessionRepositorySettings),
    CacheFactory.getCacheAdapter(props),
    RSAFactory.getRSAAdapter(props),
    JWTFactory.GetJWTAdapter(props.secret)
  )
