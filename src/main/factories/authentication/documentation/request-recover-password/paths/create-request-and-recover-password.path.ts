import { DocumentationPathModel, DocumentationHttpStatusCode, DocumentationContentType } from '@/protocols/documentation'

export const CreateRequestAndRecoverPasswordPath: DocumentationPathModel = {
  post: {
    tags: ['Recuperação de senha'],
    summary: 'Solicita a recuperação de senha do usuário',
    requestBody: {
      description: 'Dados para a solicitação da recuperação de senha do usuário',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/createRequestRecoverPassword'
          }
        }
      }
    },
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
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  },
  patch: {
    tags: ['Recuperação de senha'],
    summary: 'Atualiza a senha do usuário',
    requestBody: {
      description: 'Dados para a recuperação de senha do usuário',
      content: {
        [DocumentationContentType.Json]: {
          schema: {
            $ref: '#/schemas/authentication/recoverPassword'
          }
        }
      }
    },
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
      [DocumentationHttpStatusCode.UnprocessableEntity]: {
        $ref: '#/components/common/unprocessableEntity'
      }
    }
  }
}
