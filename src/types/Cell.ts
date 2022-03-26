export enum CellEnum {
  NUM,
  MINE,
  FLAG,
  WALL,
}

export interface CellState {
  isEmpty: boolean;
  display: CellEnum;
  num: number;
}
