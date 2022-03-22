import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationDataType } from '@/protocols/documentation'

export const CreateOrListAccountAccessModulePath: DocumentationPathModel = {
  post: {
    tags: ['Perfil de acesso do usuário para um módulo/aplicação'],
    summary: 'Define o perfil de acesso de um usuário para um módulo/aplicação',
    requestBody: {
      description: 'Dados para definir o perfil de acesso do usuário para um módulo/aplicação',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createOrUpdateAccountAccessModule'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Created]: {
        description: 'Dados para definir o perfil de acesso do usuário para um módulo/aplicação',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/accountAccessModule'
            }
          }
        }
      },
      [DocumentationHttpStatusCode.Conflict]: {
        $ref: '#/components/common/conflict'
      },
      [DocumentationHttpStatusCode.Unauthorized]: {
        $ref: '#/components/common/unauthorized'
      },
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  },
  get: {
    tags: ['Perfil de acesso do usuário para um módulo/aplicação'],
    summary: 'Lista perfil de acesso de usuários para os módulos/aplicações',
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados para definir o perfil de acesso do usuário para um módulo/aplicação',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              type: DocumentationDataType.Array,
              items: {
                $ref: '#/schemas/authentication/accountAccessModule'
              }
            }
          }
        }
      },
      [DocumentationHttpStatusCode.Unauthorized]: {
        $ref: '#/components/common/unauthorized'
      },
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
