import { EnvironmentType } from '@/main/application/config'
import { RepositoryType } from '@/infrastructure/repositories'
import { CacheConfigurationModel } from '@/infrastructure/cache'
import { MailConfigModel } from '@/infrastructure/mail'

export type ConfigurationModel = {
  environment: EnvironmentType
  port: number
  repositoryType: RepositoryType
  messageQueue: {
    host: string
    prefix: string
  }
  authentication: {
    host: string
    accessTokenPrefix: string
    accessTokenName: string
    vendorAccountId: string
  }
  security: {
    salt: number
    getPublicKey: () => Promise<string>
    getPrivateKey: () => Promise<string>
    accessTokenValidityInMinutes: number
    refreshTokenValidityInMinutes: number
    jwtSecret: string
  }
  logoFilePath: string
  cache: CacheConfigurationModel
  mail: MailConfigModel
}
