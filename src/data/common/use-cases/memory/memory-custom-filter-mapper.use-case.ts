import { CustomFilterMapperUseCase, CustomFilterMapperDTO, CustomFilterModel, CustomFilterOperator, CustomFilterConditional } from '@/domain/common'

export class MemoryCustomFilterMapperUseCase implements CustomFilterMapperUseCase {
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

  async getFilters ({ fields, operators, values, conditionals }: CustomFilterMapperDTO): Promise<CustomFilterModel[]> {
    const filters: CustomFilterModel[] = []
    fields?.forEach((field, index) => {
      if (this.validParamsColumns.includes(field)) {
        const repositoryField = this.validRepositoryColumns[this.validParamsColumns.indexOf(field)]
        const operator = this.getValue<CustomFilterOperator>(operators, index, CustomFilterOperator.and)
        const conditional = this.getValue<CustomFilterConditional>(conditionals, index, CustomFilterConditional.equal)
        const value = this.getValue<string>(values, index, undefined)
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
