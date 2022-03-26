import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationParamType, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const DeleteOrGetOrUpdateAccountAccessModulePath: DocumentationPathModel = {
  put: {
    tags: ['Perfil de acesso do usuário para um módulo/aplicação'],
    summary: 'Atualiza o perfil de acesso de um usuário para um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'account_access_module_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    requestBody: {
      description: 'Dados para definir o perfil de acesso de um usuário para um módulo/aplicação',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createOrUpdateAccountAccessModule'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Perfil de acesso de um usuário para um módulo/aplicação',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/accountAccessModule'
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
  delete: {
    tags: ['Perfil de acesso do usuário para um módulo/aplicação'],
    summary: 'Remove o perfil de acesso de um usuário para um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'account_access_module_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    responses: {
      [DocumentationHttpStatusCode.NoContent]: {
        $ref: '#/components/common/noContent'
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
    tags: ['Perfil de acesso do usuário para um módulo/aplicação'],
    summary: 'Busca o perfil de acesso do usuário para um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'account_access_module_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Perfil de acesso de um usuário para um módulo/aplicação',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/module'
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
