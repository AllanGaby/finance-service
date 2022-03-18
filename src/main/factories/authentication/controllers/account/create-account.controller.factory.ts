import { AccountModel, CreateAccountDTO } from '@/domain/authentication'
import { CreateEntityController } from '@/presentation/common/controllers'
import { CreateAccountUseCaseProps, makeCreateAccountUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccountControllerProps = CreateAccountUseCaseProps

export const makeCreateAccountController = (
  props: CreateAccountControllerProps
): CreateEntityController<AccountModel, CreateAccountDTO> =>
  new CreateEntityController(
    makeCreateAccountUseCase(props)
  )
