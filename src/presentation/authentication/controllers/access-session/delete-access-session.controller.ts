import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { AccessSessionHeaderRequest } from '@/presentation/authentication'
import { DeleteAccessSessionUseCase } from '@/domain/authentication'

type DeleteAccessSessionResponse = undefined | Error | object

export class DeleteAccessSessionController implements ControllerProtocol<any, DeleteAccessSessionResponse, AccessSessionHeaderRequest> {
  constructor (
    private readonly deleteAccessSessionUseCase: DeleteAccessSessionUseCase
  ) {}

  async handle (request: HttpRequest<any, AccessSessionHeaderRequest>): Promise<HttpResponse<DeleteAccessSessionResponse>> {
    await this.deleteAccessSessionUseCase.delete(request.headers.access_session)
    return HttpHelper.noContent()
  }
}
