import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationParamType, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const DeleteOrGetOrUpdateModuleAccessRulePath: DocumentationPathModel = {
  put: {
    tags: ['Regra de acesso'],
    summary: 'Atualiza o cadastro de uma regra de acesso pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_access_rule_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    requestBody: {
      description: 'Dados da regra de acesso',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createOrUpdateModuleAccessRule'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
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
  delete: {
    tags: ['Regra de acesso'],
    summary: 'Exclui o cadastro de uma regra de acesso',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_access_rule_id',
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
    tags: ['Regra de acesso'],
    summary: 'Busca uma regra de acesso pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'module_access_rule_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
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
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
