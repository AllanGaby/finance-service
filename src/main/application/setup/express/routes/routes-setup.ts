import { Express } from 'express'
import { ConfigSetup } from '@/main/application/config'
import { AuthenticationModuleRoute } from '@/main/factories/authentication/setup'

export const RoutesSetup = async (app: Express): Promise<void> => {
  const config = ConfigSetup()
  const commonConfig = {
    repositoryType: config.repositoryType,
    salt: config.security.salt
  }

  app.use('/authentication', AuthenticationModuleRoute({
    ...commonConfig,
    privateKey: await config.security.getPrivateKey(),
    publicKey: await config.security.getPublicKey(),
    ...config.cache,
    secret: config.security.jwtSecret
  }))
}
