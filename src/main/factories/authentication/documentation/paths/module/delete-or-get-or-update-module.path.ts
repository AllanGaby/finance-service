import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationParamType, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const DeleteOrGetOrUpdateModulePath: DocumentationPathModel = {
  put: {
    tags: ['Módulo/Aplicação'],
    summary: 'Atualiza o cadastro de um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    requestBody: {
      description: 'Dados do módulo/aplicação',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createOrUpdateModule'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados do módulo/aplicação',
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
    tags: ['Módulo/Aplicação'],
    summary: 'Exclui o cadastro de um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_id',
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
    tags: ['Módulo/Aplicação'],
    summary: 'Busca um módulo/aplicação pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados do módulo/aplicação',
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
      [DocumentationHttpStatusCode.Forbidden]: {
        $ref: '#/components/common/forbidden'
      },
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
