import { DeleteAccessSessionController } from '@/presentation/authentication'
import { DeleteAccessSessionUseCaseProps, makeDeleteAccessSessionUseCase } from '@/main/factories/authentication/use-cases'

export type DeleteAccessSessionControllerProps = DeleteAccessSessionUseCaseProps

export const makeDeleteAccessSessionController = (props: DeleteAccessSessionControllerProps): DeleteAccessSessionController =>
  new DeleteAccessSessionController(
    makeDeleteAccessSessionUseCase(props)
  )
