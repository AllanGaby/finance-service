import { MapFilterToURLParamsUseCase, ListEntitiesDTO } from '@/domain/common'
import { datatype } from 'faker'

export class MapFilterToURLParamsUseCaseSpy implements MapFilterToURLParamsUseCase {
  filter: ListEntitiesDTO
  urlParams: string = datatype.uuid()

  map (filter: ListEntitiesDTO): string {
    this.filter = filter
    return this.urlParams
  }
}
