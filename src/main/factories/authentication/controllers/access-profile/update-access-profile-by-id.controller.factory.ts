import { AccessProfileModel } from '@/domain/authentication'
import { UpdateEntityByIdController } from '@/presentation/common'
import { UpdateAccessProfileByIdUseCaseProps, makeUpdateAccessProfileByIdUseCase } from '@/main/factories/authentication/use-cases'

export type UpdateAccessProfileByIdControllerProps = UpdateAccessProfileByIdUseCaseProps & {
  paramIdName: string
}

export const makeUpdateAccessProfileByIdController = (
  props: UpdateAccessProfileByIdControllerProps
): UpdateEntityByIdController<AccessProfileModel> =>
  new UpdateEntityByIdController(
    makeUpdateAccessProfileByIdUseCase(props),
    props.paramIdName
  )
