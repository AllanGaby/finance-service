import { CreateEntityUseCase } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionByProviderDTO } from '@/domain/authentication'
import { DbCreateAccessSessionByProviderUseCase } from '@/data/authentication/use-cases'
import { CreateEntityRepository, GetOneEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity, AccountProviderEntity, AccountRepositorySettings, AccountProviderRepositorySettings } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'
import { CreateAccessSessionUseCaseProps, makeCreateAccessSessionUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessSessionByProviderUseCaseProps =
CreateAccessSessionUseCaseProps &
CommonUseCaseProps & {
  salt: number
}

export const makeCreateAccessSessionByProviderUseCase = (props: CreateAccessSessionByProviderUseCaseProps): CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionByProviderDTO> =>
  new DbCreateAccessSessionByProviderUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, CreateEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    CommonRepositoryFactory.getRepository<AccountEntity, GetOneEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    CryptographyFactory.GetCryptographyAdapter(props.salt),
    CommonRepositoryFactory.getRepository<AccountProviderEntity, CreateEntityRepository<AccountProviderEntity>>(props.repositoryType, AccountProviderEntity, AccountProviderRepositorySettings),
    makeCreateAccessSessionUseCase(props)
  )
