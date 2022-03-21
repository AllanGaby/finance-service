import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { CommonDocumentationSetup } from '@/main/factories/common/setup'
import { AuthenticationDocumentationSetup } from '@/main/factories/authentication/setup'

export const SwaggerSetup = (app: Express): void => {
  const swaggerOptions = {
    openapi: '3.0.0',
    info: {
      title: 'Authentication Service',
      description: '',
      version: '1.0.0',
      contact: {
        name: 'Allan Gaby',
        email: 'allan.gaby@gmail.com',
        url: 'www.linkedin.com/in/allan-gaby'
      }
    },
    servers: [{
      url: '/',
      description: 'Authentication Service'
    }],
    components: {
      common: CommonDocumentationSetup.components
    },
    schemas: {
      authentication: AuthenticationDocumentationSetup.schemas
    },
    paths: {
      ...AuthenticationDocumentationSetup.paths
    }
  }
  app.use('/api-docs', serve, setup(swaggerOptions))
}
