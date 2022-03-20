import { CreateEntityUseCase } from '@/domain/common'
import { AccountModel, CreateAccountDTO } from '@/domain/authentication'
import { DbCreateAccountUseCase } from '@/data/authentication/use-cases'
import { CreateEntityRepository, GetOneEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'

export type CreateAccountUseCaseProps =
CommonUseCaseProps & {
  salt: number
}

export const makeCreateAccountUseCase = (props: CreateAccountUseCaseProps): CreateEntityUseCase<AccountModel, CreateAccountDTO> =>
  new DbCreateAccountUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, CreateEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, props.repositorySettings),
    CommonRepositoryFactory.getRepository<AccountEntity, GetOneEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, props.repositorySettings),
    CryptographyFactory.GetCryptographyAdapter(props.salt)
  )
