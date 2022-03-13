import { WorksheetHeaderModel } from '@/protocols/excel'
import { database, system } from 'faker'

export const mockWorksheetHeaderModel = (): WorksheetHeaderModel => ({
  logoPath: system.filePath(),
  headers: [
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ],
  subHeaders: [
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ]
})
