import { AccessProfileModel } from '@/domain/authentication'
import { CreateEntityController } from '@/presentation/common'
import { CreateAccessProfileUseCaseProps, makeCreateAccessProfileUseCase } from '@/main/factories/authentication/use-cases'

export type CreateAccessProfileControllerProps = CreateAccessProfileUseCaseProps

export const makeCreateAccessProfileController = (
  props: CreateAccessProfileControllerProps
): CreateEntityController<AccessProfileModel> =>
  new CreateEntityController(
    makeCreateAccessProfileUseCase(props)
  )
