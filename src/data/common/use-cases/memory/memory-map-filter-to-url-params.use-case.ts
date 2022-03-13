import { MapFilterToURLParamsUseCase, ListEntitiesDTO } from '@/domain/common'

export class MemoryMapFilterToURLParamsUseCase implements MapFilterToURLParamsUseCase {
  private urlParams: string = ''

  private addUrlParams (field: string, value: string): void {
    if (value) {
      this.urlParams = `${this.urlParams}${this.urlParams ? '&' : ''}${field}=${value}`
    }
  }

  map (filter: ListEntitiesDTO = {}): string {
    this.urlParams = ''
    const { textToSearch, orderColumn, orderDirection, recordsPerPage, page, filters } = filter
    this.addUrlParams('search', textToSearch)
    this.addUrlParams('order', orderColumn)
    this.addUrlParams('direction', orderDirection)
    this.addUrlParams('size', recordsPerPage?.toString())
    this.addUrlParams('page', page?.toString())
    filters?.forEach(item => {
      const { field, conditional, value, operator } = item
      this.addUrlParams('f', field)
      this.addUrlParams('c', conditional)
      this.addUrlParams('v', value?.toString())
      this.addUrlParams('o', operator)
    })
    if (this.urlParams) {
      return `?${this.urlParams}`
    }
    return ''
  }
}
