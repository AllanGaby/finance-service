import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const CreateOrListAccountPath: DocumentationPathModel = {
  post: {
    tags: ['Conta de acesso'],
    summary: 'Cria uma conta de acesso',
    requestBody: {
      description: 'Dados da conta de acesso',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createAccount'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Created]: {
        description: 'Dados do conta de acesso',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/account'
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
    tags: ['Conta de acesso'],
    summary: 'Lista contas de acesso',
    security: [{
      bearerAuth: []
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados da conta de acesso',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              type: DocumentationDataType.Array,
              items: {
                $ref: '#/schemas/authentication/account'
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
