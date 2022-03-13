import { GetCustomFilterUseCase, GetCustomFilterDTO, CustomFilterModel, CustomFilterOperator, CustomFilterConditional } from '@/domain/common'

export class MemoryGetCustomFilterUseCase implements GetCustomFilterUseCase {
  constructor (
    private readonly validParamsColumns: string[],
    private readonly validRepositoryColumns: string[]
  ) {}

  getValue<ValueType>(list: ValueType[], index: number, defaultValue: ValueType): ValueType {
    if ((list) && (list.length > 0) && (list.length >= index)) {
      return list[index]
    }
    return defaultValue
  }

  async getFilter ({ f, o, v, c }: GetCustomFilterDTO): Promise<CustomFilterModel[]> {
    const filters: CustomFilterModel[] = []
    f?.forEach((field, index) => {
      if (this.validParamsColumns.includes(field)) {
        const repositoryField = this.validRepositoryColumns[this.validParamsColumns.indexOf(field)]
        const operator = this.getValue<CustomFilterOperator>(o, index, CustomFilterOperator.and)
        const conditional = this.getValue<CustomFilterConditional>(c, index, CustomFilterConditional.equal)
        const value = this.getValue<string>(v, index, undefined)
        const filter: CustomFilterModel = {
          field: repositoryField,
          conditional,
          operator,
          value
        }
        filters.push(filter)
      }
    })
    return filters
  }
}
