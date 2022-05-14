import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType, DocumentationDataType, DocumentationParamType, DocumentationStringFormat } from '@/protocols/documentation'

export const ListAccessProfilesAndExportToXLSXFilePath: DocumentationPathModel = {
  get: {
    tags: ['Perfil de acesso'],
    summary: 'Lista perfis de acesso e exporta para arquivo XLSX',
    security: [{
      bearerAuth: []
    }],
    parameters: [{
      in: DocumentationParamType.Path,
      name: 'columns',
      required: true,
      type: DocumentationDataType.String
    }],
    responses: {
      [DocumentationHttpStatusCode.Ok]: {
        description: 'Arquivo com os dados dos perfis de acesso',
        content: {
          [DocumentationContentType.Xlsx]: {
            schema: {
              type: DocumentationDataType.String,
              format: DocumentationStringFormat.Binary
            }
          }
        }
      },
      [DocumentationHttpStatusCode.BadRequest]: {
        $ref: '#/components/common/badRequest'
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
