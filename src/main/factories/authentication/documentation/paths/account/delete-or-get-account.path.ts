import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationParamType, DocumentationDataType, DocumentationStringFormat } from '@/protocols/documentation'

export const DeleteOrGetAccountPath: DocumentationPathModel = {
  delete: {
    tags: ['Conta de acesso'],
    summary: 'Exclui o cadastro de uma conta de acesso pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'account_id',
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
    tags: ['Conta de acesso'],
    summary: 'Busca uma conta de acesso pelo identificador único',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'account_id',
      required: true,
      type: DocumentationDataType.String,
      format: DocumentationStringFormat.Uuid
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Dados da conta de acesso',
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
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
