import path from 'path'
import dotenv from 'dotenv'
import { ConfigurationModel, EnvironmentType } from '@/main/application/config'
import { RepositoryType } from '@/infrastructure/repositories'
import { CacheType } from '@/infrastructure/cache'
import fs from 'fs'

dotenv.config({
  path: path.resolve(__dirname, '..', '..', '..', '..', '..', '.env')
})

const getPublicKey = async (): Promise<string> => {
  if (process.env.SECURITY_PUBLIC_KEY) {
    return process.env.SECURITY_PUBLIC_KEY
  }
  return fs.readFileSync(path.resolve(__dirname, '..', '..', '..', '..', '..', 'public_key.pem')).toString()
}

export const ConfigSetup = (): ConfigurationModel => {
  const environment = process.env.ENVIRONMENT as EnvironmentType
  return {
    environment,
    port: Number(process.env.API_PORT) || 9999,
    repositoryType: environment === EnvironmentType.test ? RepositoryType.Memory : process.env.REPOSITORY_TYPE as RepositoryType,
    authentication: {
      accessTokenPrefix: process.env.AUTHENTICATION_ACCESS_TOKEN_PREFIX || 'bearer ',
      accessTokenName: process.env.AUTHENTICATION_ACCESS_TOKEN_NAME || 'authorization',
      host: process.env.AUTHENTICATION_HOST,
      vendorAccountId: process.env.AUTHENTICATION_VENDOR_ACCOUNT_ID
    },
    messageQueue: {
      host: process.env.MESSAGE_QUEUE_HOST,
      prefix: process.env.MESSAGE_QUEUE_PREFIX
    },
    security: {
      salt: Number(process.env.SECURITY_SALT),
      getPublicKey,
      jwtSecret: process.env.SECURITY_JWT_SECRET,
      accessTokenValidityInMinutes: Number(process.env.SECURITY_ACCESS_TOKEN_VALIDITY),
      refreshTokenValidityInMinutes: Number(process.env.SECURITY_REFRESH_TOKEN_VALIDITY)
    },
    cache: {
      cacheType: environment === EnvironmentType.test ? CacheType.Memory : process.env.CACHE_TYPE as CacheType,
      host: process.env.CACHE_HOST,
      port: Number(process.env.CACHE_PORT),
      password: process.env.CACHE_PASSWORD
    }
  }
}
