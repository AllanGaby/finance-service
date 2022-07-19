import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { EnvironmentType } from '@/main/application/config'
import { CreateAccessSessionByProviderControllerProps, makeCreateAccessSessionByProviderController } from '@/main/factories/authentication/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { makeGetCurrentSettingsUseCase, GetCurrentSettingsUseCaseProps } from '@/main/factories/common/use-cases'
import { FieldValidationType } from '@/protocols/http'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router, Express } from 'express'
import passport, { Profile } from 'passport'
import { OAuth2Strategy } from 'passport-google-oauth'

export type CreateAccessSessionByGoogleRouteProps =
GetCurrentSettingsUseCaseProps &
CreateAccessSessionByProviderControllerProps & {
  app: Express
  environment: EnvironmentType
}

export const makeCreateAccessSessionByGoogleRoute = async (
  props: CreateAccessSessionByGoogleRouteProps,
  fieldsValidation: FieldValidationModel[]
): Promise<Router> => {
  if (props.environment === EnvironmentType.test) {
    return Router()
  }
  setTimeout(async () => {
    const getCurrentSettingsUseCase = makeGetCurrentSettingsUseCase(props)    
    const settings = await getCurrentSettingsUseCase.getCurrentSettings()
    console.log(settings)
    props.app.use(passport.initialize())
    passport.use(new OAuth2Strategy({
      clientID: settings.google_client_id,
      clientSecret: settings.google_client_secret,
      callbackURL: settings.google_callback_url
    }, (accessToken: string, refreshToken: string, profile: Profile, done) => {
      return done(null, profile)
    }))
    props.app.get('/google/provider',
        passport.authenticate('google', {
          failureRedirect: '/',
          scope: settings.google_scopes.split(','),
          session: false
        }),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation, FieldValidationType.User)),
        ExpressControllerAdapter(makeCreateAccessSessionByProviderController(props)))
  }, 60000)
  return undefined
}
