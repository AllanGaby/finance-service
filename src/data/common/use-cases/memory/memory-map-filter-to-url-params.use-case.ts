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
    const { textToSearch, order, recordsPerPage, page, filters } = filter
    this.addUrlParams('search', textToSearch)
    this.addUrlParams('size', recordsPerPage?.toString())
    this.addUrlParams('page', page?.toString())
    if (order) {
      Object.keys(order).forEach(field => {
        this.addUrlParams('order', field)
        this.addUrlParams('direction', order[field])
      })
    }
    filters?.forEach(item => {
      const { field, conditional, value, operator } = item
      this.addUrlParams('field', field)
      this.addUrlParams('conditional', conditional)
      this.addUrlParams('value', value?.toString())
      this.addUrlParams('operator', operator)
    })
    if (this.urlParams) {
      return `?${this.urlParams}`
    }
    return ''
  }
}
