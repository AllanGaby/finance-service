import { AccessSessionPayloadModel, CreateAccessSessionDTO } from '@/domain/authentication'
import { CreateEntityController } from '@/presentation/common'
import { CreateAccessSessionUseCaseProps, makeCreateAccessSessionUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessSessionControllerProps =
CreateAccessSessionUseCaseProps

export const makeCreateAccessSessionController = (props: CreateAccessSessionControllerProps): CreateEntityController<AccessSessionPayloadModel, CreateAccessSessionDTO> =>
  new CreateEntityController(
    makeCreateAccessSessionUseCase(props)
  )
