import { Cell, Style } from 'excel4node'

export class Excel4NodeCellSpy implements Cell {
  comment (arg: string): Cell {
    return this
  }

  string (arg: string | any[]): Cell {
    return this
  }

  number (arg: number): Cell {
    return this
  }

  formula (arg: string): Cell {
    return this
  }

  date (arg: string | Date): Cell {
    return this
  }

  link (arg: string): Cell {
    return this
  }

  bool (arg: boolean): Cell {
    return this
  }

  style (arg: Style): Cell {
    return this
  }
}
