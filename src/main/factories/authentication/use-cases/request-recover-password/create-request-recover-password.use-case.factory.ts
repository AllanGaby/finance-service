import { CreateEntityUseCase } from '@/domain/common'
import { RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO } from '@/domain/authentication'
import { DbCreateRequestRecoverPasswordUseCase } from '@/data/authentication/use-cases'
import { GetOneEntityRepository, SoftDeleteEntityRepository, CreateEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccountRepositorySettings, AccountEntity, RequestRecoverPasswordEntity } from '@/infrastructure/authentication'
import { TwoFactorAuthenticationFactory } from '@/infrastructure/two-factor-authentication'
import { SendMailUseCaseProps, makeSendMailUseCase } from '@/main/factories/comunication/use-cases'

export type CreateRequestRecoverPasswordUseCaseProps =
SendMailUseCaseProps &
CommonUseCaseProps & {
  recoverPasswordEmailFilePath: string
}

export const makeCreateRequestRecoverPasswordUseCase = (props: CreateRequestRecoverPasswordUseCaseProps): CreateEntityUseCase<RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO> =>
  new DbCreateRequestRecoverPasswordUseCase(
    CommonRepositoryFactory.getRepository<AccountEntity, GetOneEntityRepository<AccountEntity>>(props.repositoryType, AccountEntity, AccountRepositorySettings),
    TwoFactorAuthenticationFactory.GetTwoFactorAuthenticationAdapter(),
    TwoFactorAuthenticationFactory.GetTwoFactorAuthenticationAdapter(),
    CommonRepositoryFactory.getRepository<RequestRecoverPasswordEntity, SoftDeleteEntityRepository<RequestRecoverPasswordEntity>>(props.repositoryType, RequestRecoverPasswordEntity),
    CommonRepositoryFactory.getRepository<RequestRecoverPasswordEntity, CreateEntityRepository<RequestRecoverPasswordEntity>>(props.repositoryType, RequestRecoverPasswordEntity),
    makeSendMailUseCase(props),
    props.recoverPasswordEmailFilePath
  )
