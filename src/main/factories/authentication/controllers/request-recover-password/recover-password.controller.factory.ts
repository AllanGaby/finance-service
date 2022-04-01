import { RequestRecoverPasswordModel, RecoverPasswordDTO } from '@/domain/authentication'
import { UpdateEntityController } from '@/presentation/common'
import { RecoverPasswordUseCaseProps, makeRecoverPasswordUseCase } from '@/main/factories/authentication/use-cases'

export type RecoverPasswordControllerProps = RecoverPasswordUseCaseProps

export const makeRecoverPasswordController = (
  props: RecoverPasswordControllerProps
): UpdateEntityController<RequestRecoverPasswordModel, RecoverPasswordDTO> =>
  new UpdateEntityController(
    makeRecoverPasswordUseCase(props)
  )
