import { Express } from 'express'
import { ConfigSetup } from '@/main/application/config'
import { AuthenticationModuleRoute } from '@/main/factories/authentication/setup'
import { CommonModuleRoute } from '@/main/factories/common/setup'
import { FinanceModuleRoute } from '@/main/factories/finance'

export const RoutesSetup = async (app: Express): Promise<void> => {
  const config = ConfigSetup()
  const commonConfig = {
    environment: config.environment,
    repositoryType: config.repositoryType,
    salt: config.security.salt,
    privateKey: await config.security.getPrivateKey(),
    publicKey: await config.security.getPublicKey(),
    ...config.cache,
    secret: config.security.jwtSecret,
    accessTokenName: config.authentication.accessTokenName,
    logoFilePath: config.logoFilePath
  }

  const authenticationRoute = await AuthenticationModuleRoute({
    ...commonConfig,
    recoverPasswordEmailFilePath: 'public/views/ejs/request-recover-password-mail.ejs',
    mail: config.mail,
    app
  })

  app.use('/authentication', authenticationRoute)

  app.use('/authentication', CommonModuleRoute(commonConfig))
  app.use('/finance', await FinanceModuleRoute(commonConfig))
}
