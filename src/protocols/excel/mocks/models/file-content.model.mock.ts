import { FileContentModel } from '@/protocols/excel'
import { database, datatype } from 'faker'

export const mockFileContentModel = (sheetCount: number = datatype.number({ min: 2, max: 10 })): FileContentModel => {
  const fileContent: FileContentModel = {}
  for (let index = 0; index < sheetCount; index++) {
    fileContent[database.column()] = [
      datatype.uuid(),
      datatype.uuid(),
      datatype.uuid(),
      datatype.uuid()
    ]
  }
  return fileContent
}
