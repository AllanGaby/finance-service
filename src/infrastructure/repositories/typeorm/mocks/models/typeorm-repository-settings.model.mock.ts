import { TypeOrmRepositorySettingsModel } from '@/infrastructure/repositories'
import { database, datatype } from 'faker'

export const mockTypeOrmRepositorySettingsModel = (): TypeOrmRepositorySettingsModel => ({
  join: {
    alias: database.column()
  },
  completeJoin: {
    alias: database.column()
  },
  columnsToFilter: [
    database.column(),
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ],
  columnsToSearch: [
    database.column(),
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ],
  useSoftDelete: datatype.boolean()
})
