import { UpdateEntityUseCase } from '@/domain/common'
import { RequestRecoverPasswordModel, RecoverPasswordDTO } from '@/domain/authentication'
import { DbRecoverPasswordUseCase } from '@/data/authentication/use-cases'
import { GetOneEntityRepository, UpdateEntityRepository, SoftDeleteEntityByIdRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountEntity, RequestRecoverPasswordEntity } from '@/infrastructure/authentication'
import { CryptographyFactory } from '@/infrastructure/cryptography'

export type RecoverPasswordUseCaseProps =
CommonUseCaseProps & {
  salt: number
}

export const makeRecoverPasswordUseCase = ({ salt, ...props }: RecoverPasswordUseCaseProps): UpdateEntityUseCase<RequestRecoverPasswordModel, RecoverPasswordDTO> =>
  new DbRecoverPasswordUseCase(
    CommonRepositoryFactory.getRepository<RequestRecoverPasswordEntity, GetOneEntityRepository<RequestRecoverPasswordEntity>>(props.repositoryType, RequestRecoverPasswordEntity, props.repositorySettings),
    CryptographyFactory.GetCryptographyAdapter(salt),
    CryptographyFactory.GetCryptographyAdapter(salt),
    CommonRepositoryFactory.getRepository<AccountEntity, UpdateEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, props.repositorySettings),
    CommonRepositoryFactory.getRepository<RequestRecoverPasswordEntity, SoftDeleteEntityByIdRepository<RequestRecoverPasswordEntity>>(props.repositoryType, RequestRecoverPasswordEntity, props.repositorySettings)
  )
