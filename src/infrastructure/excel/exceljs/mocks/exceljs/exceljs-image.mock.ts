import { Buffer, Image } from 'exceljs'
import { datatype, random } from 'faker'

export const mockExcelJSImage = (): Image => ({
  extension: random.arrayElement(['jpeg', 'png', 'gif']),
  buffer: Buffer.from(datatype.string())
})
