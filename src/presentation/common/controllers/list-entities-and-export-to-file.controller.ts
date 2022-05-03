import { ControllerProtocol, HttpRequest, HttpResponse, HttpHelper, HttpContentType } from '@/protocols/http'
import { EntityModel, ListEntitiesAndExportToFileUseCase } from '@/domain/common'
import { ListEntitiesRequest, ExportEntitiesToFileRequest, CustomFiltersRequest } from '@/presentation/common'

type ListEntitiesAndExportToFileResponse = string | Error | object

export class ListEntitiesAndExportToFileController<EntityType extends EntityModel> implements ControllerProtocol<any, ListEntitiesAndExportToFileResponse, any, ListEntitiesRequest, ExportEntitiesToFileRequest> {
  constructor (
    private readonly listEntitiesAndExportToFileUseCase: ListEntitiesAndExportToFileUseCase<EntityType>
  ) {}

  async handle (request: HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest, ExportEntitiesToFileRequest>): Promise<HttpResponse<ListEntitiesAndExportToFileResponse>> {
    const {
      page,
      search,
      size
    } = request.queryParams
    const fileContent = await this.listEntitiesAndExportToFileUseCase.listAndExport({
      columns: request.params.columns.split(','),
      page,
      textToSearch: search,
      recordsPerPage: size,
      order: request.body.orders,
      filters: request.body.custom_filters
    }) as ArrayBuffer
    return HttpHelper.exportFile({
      contentType: HttpContentType.xlsx,
      fileContent
    })
  }
}
