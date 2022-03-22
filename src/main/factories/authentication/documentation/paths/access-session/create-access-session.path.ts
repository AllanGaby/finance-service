import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType } from '@/protocols/documentation'

export const CreateAccessSessionPath: DocumentationPathModel = {
  post: {
    tags: ['Sessão de acesso'],
    summary: 'Cria uma sessão de acesso para o usuário',
    requestBody: {
      description: 'Dados para a criação da sessão de acesso',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createAccessSession'
          }
        }
      }
    },
    responses: {
      [DocumentationHttpStatusCode.Created]: {
        description: 'Dados da sessão de acesso',
        content: {
          [DocumentationContentType.Json]: {
            schema: {
              $ref: '#/schemas/authentication/accessSession'
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
  }
}
