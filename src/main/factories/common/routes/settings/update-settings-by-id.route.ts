import { FieldValidationModel } from '@/protocols/request-validator'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateSettingsByIdControllerProps, makeUpdateSettingsByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { makeRecoverAccessSessionMiddleware, RecoverAccessSessionMiddlewareProps } from '@/main/factories/authentication/middlewares'

export type UpdateSettingsByIdRouteProps =
Omit<Omit<UpdateSettingsByIdControllerProps, 'paramIdName'>, 'entityName'> &
RecoverAccessSessionMiddlewareProps

export const makeUpdateSettingsByIdRoute = (
  props: UpdateSettingsByIdRouteProps,
  fieldsValidation: FieldValidationModel[],
  updateAccessRules: string[]
): Router =>
  Router()
    .put('/:settings_id',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware('settings_id')),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateSettingsByIdController({
        ...props,
        paramIdName: 'settings_id',
        entityName: 'SettingsModel'
      })))
