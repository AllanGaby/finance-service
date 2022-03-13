import { ExcelColumnHeaderModel } from '@/protocols/excel'
import { Style } from 'excel4node'

export type Excel4NodeColumnHeaderModel = ExcelColumnHeaderModel & {
  style?: Style
}
