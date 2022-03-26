import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const CreateOrListModuleAccessRulePath: DocumentationPathModel = {
  post: {
    tags: ['Regra de acesso'],
    summary: 'Cria uma regra de acesso',
    security: [{
      bearerAuth: []
    }],
    requestBody: {
      description: 'Dados da regra de acessp',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createOrUpdateModuleAccessRule'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Created]: {
        description: 'Dados da regra de acesso',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/moduleAccessRule'
            }
          }
        }
      },
      [DocumentationHttpStatusCode.Unauthorized]: {
        $ref: '#/components/common/unauthorized'
      },
      [DocumentationHttpStatusCode.Forbidden]: {
        $ref: '#/components/common/forbidden'
      },
      [DocumentationHttpStatusCode.Conflict]: {
        $ref: '#/components/common/conflict'
      },
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  },
  get: {
    tags: ['Regra de acesso'],
    summary: 'Lista regras de acesso',
    security: [{
      bearerAuth: []
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados das regras de acesso',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              type: DocumentationDataType.Array,
              items: {
                $ref: '#/schemas/authentication/moduleAccessRule'
              }
            }
          }
        }
      },
      [DocumentationHttpStatusCode.Unauthorized]: {
        $ref: '#/components/common/unauthorized'
      },
      [DocumentationHttpStatusCode.Forbidden]: {
        $ref: '#/components/common/forbidden'
      },
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
