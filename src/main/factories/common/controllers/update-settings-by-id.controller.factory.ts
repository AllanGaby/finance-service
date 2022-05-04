import { SettingsModel } from '@/domain/common'
import { UpdateEntityByIdController } from '@/presentation/common'
import { UpdateSettingsByIdUseCaseProps, makeUpdateSettingsByIdUseCase } from '@/main/factories/common/use-cases'

export type UpdateSettingsByIdControllerProps =
UpdateSettingsByIdUseCaseProps & {
  paramIdName: string
}

export const makeUpdateSettingsByIdController = (
  props: UpdateSettingsByIdControllerProps
): UpdateEntityByIdController<SettingsModel> =>
  new UpdateEntityByIdController(
    makeUpdateSettingsByIdUseCase(props),
    props.paramIdName
  )
