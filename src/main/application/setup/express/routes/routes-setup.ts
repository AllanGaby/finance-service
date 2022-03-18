import { Express } from 'express'
import { ConfigSetup } from '@/main/application/config'
import { AuthenticationModuleRoute } from '@/main/factories/authentication/setup'

export const RoutesSetup = (app: Express): void => {
  const config = ConfigSetup()
  const commonConfig = {
    repositoryType: config.repositoryType,
    salt: config.security.salt
  }

  app.use('/authentication', AuthenticationModuleRoute(commonConfig))
}
