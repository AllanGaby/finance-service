import { UpdateEntityByIdUseCase } from '@/domain/common'
import { AccountModel, UpdateAccountDTO } from '@/domain/authentication'
import { DbUpdateaccountByIdUseCase } from '@/data/authentication/use-cases'
import { UpdateEntityRepository, GetEntityByIdRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'

export type UpdateAccountByIdUseCaseProps =
CommonUseCaseProps & {
  salt: number
}

export const makeUpdateAccountByIdUseCase = (props: UpdateAccountByIdUseCaseProps): UpdateEntityByIdUseCase<AccountModel, UpdateAccountDTO> =>
  new DbUpdateaccountByIdUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, GetEntityByIdRepository<AccountEntity>>(props.repositoryType, AccountEntity, props.repositorySettings),
    CryptographyFactory.GetCryptographyAdapter(props.salt),
    CommonRepositoryFactory.getRepository<AccountEntity, UpdateEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, props.repositorySettings)
  )
