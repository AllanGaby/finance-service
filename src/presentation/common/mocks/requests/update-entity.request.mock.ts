import { UpdateEntityRequest, CommonIdParamsRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/protocols/http'
import { EntityModel, UpdateEntityDTO } from '@/domain/common'
import { datatype, random } from 'faker'

export const mockUpdateEntityRequest = <EntityDTOType = UpdateEntityDTO<EntityModel>>
  (body: EntityDTOType = random.objectElement<EntityDTOType>()):
  HttpRequest<UpdateEntityRequest<EntityDTOType>, any, any, CommonIdParamsRequest> => ({
    body,
    params: {
      id: datatype.uuid()
    }
  })
