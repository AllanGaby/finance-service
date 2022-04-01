import { RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO } from '@/domain/authentication'
import { CreateEntityController } from '@/presentation/common'
import { CreateRequestRecoverPasswordUseCaseProps, makeCreateRequestRecoverPasswordUseCase } from '@/main/factories/authentication/use-cases'

export type CreateRequestRecoverPasswordControllerProps = CreateRequestRecoverPasswordUseCaseProps

export const makeCreateRequestRecoverPasswordController = (
  props: CreateRequestRecoverPasswordControllerProps
): CreateEntityController<RequestRecoverPasswordModel, CreateRequestRecoverPasswordDTO> =>
  new CreateEntityController(
    makeCreateRequestRecoverPasswordUseCase(props)
  )
