import { CreateEntityUseCase } from '@/domain/common'
import { AccessSessionPayloadModel, CreateAccessSessionDTO } from '@/domain/authentication'
import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper } from '@/protocols/http'
import { CreateEntityRequest } from '@/presentation/common'

type CreateAccessSessionResponse = AccessSessionPayloadModel | Error | object

export class CreateAccessSessionController implements ControllerProtocol<CreateEntityRequest<CreateAccessSessionDTO>, CreateAccessSessionResponse> {
  constructor (
    private readonly createAccessSessionUseCase: CreateEntityUseCase<AccessSessionPayloadModel, CreateAccessSessionDTO>
  ) {}

  async handle (request: HttpRequest<CreateEntityRequest<CreateAccessSessionDTO>>): Promise<HttpResponse<CreateAccessSessionResponse>> {
    const accessSession = await this.createAccessSessionUseCase.create({
      ...request.body,
      ip: request.ip
    })
    return HttpHelper.created(accessSession)
  }
}
