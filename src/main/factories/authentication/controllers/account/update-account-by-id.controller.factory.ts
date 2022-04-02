import { AccountModel, UpdateAccountDTO } from '@/domain/authentication'
import { UpdateEntityByIdController } from '@/presentation/common'
import { UpdateAccountByIdUseCaseProps, makeUpdateAccountByIdUseCase } from '@/main/factories/authentication/use-cases'

export type UpdateAccountByIdControllerProps = UpdateAccountByIdUseCaseProps

export const makeUpdateAccountByIdController = (
  props: UpdateAccountByIdControllerProps
): UpdateEntityByIdController<AccountModel, UpdateAccountDTO> =>
  new UpdateEntityByIdController(
    makeUpdateAccountByIdUseCase(props),
    'account_id'
  )
