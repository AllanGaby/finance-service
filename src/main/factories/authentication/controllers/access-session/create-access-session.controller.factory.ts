import { CreateAccessSessionController } from '@/presentation/authentication'
import { CreateAccessSessionUseCaseProps, makeCreateAccessSessionUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessSessionControllerProps =
CreateAccessSessionUseCaseProps

export const makeCreateAccessSessionController = (props: CreateAccessSessionControllerProps): CreateAccessSessionController =>
  new CreateAccessSessionController(
    makeCreateAccessSessionUseCase(props)
  )
