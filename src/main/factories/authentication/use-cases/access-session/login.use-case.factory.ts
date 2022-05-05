import { LoginUseCase } from '@/domain/authentication'
import { DbLoginUseCase } from '@/data/authentication/use-cases'
import { GetOneEntityRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'
import { CreateAccessSessionUseCaseProps, makeCreateAccessSessionUseCase } from '@/main/factories/authentication/use-cases'

export type LoginUseCaseProps =
CreateAccessSessionUseCaseProps & {
  salt: number
}

export const makeLoginUseCase = (props: LoginUseCaseProps): LoginUseCase =>
  new DbLoginUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, GetOneEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    CryptographyFactory.GetCryptographyAdapter(props.salt),
    makeCreateAccessSessionUseCase(props)
  )
