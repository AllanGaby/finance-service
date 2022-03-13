import { JoinOptions } from 'typeorm'

export type TypeOrmRepositorySettingsModel = {
  join?: JoinOptions
  completeJoin?: JoinOptions
  columnsToFilter?: string[]
  useSoftDelete?: boolean
}
