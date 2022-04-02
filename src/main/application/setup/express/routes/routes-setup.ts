import { Express } from 'express'
import { ConfigSetup } from '@/main/application/config'
import { AuthenticationModuleRoute } from '@/main/factories/authentication/setup'
import { CommonModuleRoute } from '@/main/factories/common/setup'

export const RoutesSetup = async (app: Express): Promise<void> => {
  const config = ConfigSetup()
  const commonConfig = {
    repositoryType: config.repositoryType,
    salt: config.security.salt,
    privateKey: await config.security.getPrivateKey(),
    publicKey: await config.security.getPublicKey(),
    ...config.cache,
    secret: config.security.jwtSecret,
    accessTokenName: config.authentication.accessTokenName
  }

  app.use('/authentication', AuthenticationModuleRoute({
    ...commonConfig,
    recoverPasswordEmailFilePath: 'public/views/ejs/request-recover-password-mail.ejs',
    mail: config.mail
  }))

  app.use('/authentication', CommonModuleRoute(commonConfig))
}
