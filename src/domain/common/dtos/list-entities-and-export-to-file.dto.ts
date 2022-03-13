import { ListEntitiesDTO } from '@/domain/common'

export type ListEntitiesAndExportToFileDTO = ListEntitiesDTO & {
  columns: string[]
}
