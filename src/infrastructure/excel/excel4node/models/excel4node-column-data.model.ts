import { ExcelColumnDataModel } from '@/protocols/excel'
import { Style } from 'excel4node'

export type Excel4NodeColumnDataModel = ExcelColumnDataModel & {
  style?: Style
  comment?: string
}
