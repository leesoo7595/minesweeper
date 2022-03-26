export enum CellEnum {
  NUM,
  MINE,
  WALL,
}

export interface CellState {
  isOpen: boolean;
  isFlag: boolean;
  display: CellEnum;
  num: number;
}
