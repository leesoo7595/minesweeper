import { makeAutoObservable, action, observable, toJS } from 'mobx';
import { CellEnum, CellState } from '../types/Cell';
import { GameState } from '../types/GameState';

const initCellState: CellState = {
  isEmpty: false,
  display: CellEnum.NUM,
  num: 0,
};

class GameStore {
  constructor() {
    makeAutoObservable(this, {
      width: observable,
      height: observable,
      gameState: observable,
      minesCount: observable,
      cellBoard: observable,
      reset: action,
    });
    this.initBoard();
    this.initMines();
  }

  width = 8;
  height = 8;
  gameState: GameState = GameState.READY;
  minesCount = 10;
  cellBoard: CellState[][] = [];
  time = 0;

  private initBoard() {
    for (let i = 0; i < this.width + 2; i++) {
      this.cellBoard[i] = [];
      for (let j = 0; j < this.height + 2; j++) {
        this.cellBoard[i][j] = { ...initCellState };
        this.cellBoard[i][j].isEmpty = true;
        if (i === 0 || i === this.width + 1) {
          this.cellBoard[i][j].display = CellEnum.WALL;
        }
        if (j === 0 || j === this.height + 1) {
          this.cellBoard[i][j].display = CellEnum.WALL;
        }
      }
    }
  }

  private initMines() {
    while (this.minesCount > 0) {
      const randomX = Math.floor(Math.random() * this.width + 1);
      const randomY = Math.floor(Math.random() * this.height + 1);
      console.log(randomX, randomY);
      if (this.cellBoard[randomX][randomY].display !== CellEnum.MINE) {
        this.cellBoard[randomX][randomY].display = CellEnum.MINE;
        this.cellBoard[randomX][randomY + 1].num += 1;
        this.cellBoard[randomX][randomY - 1].num += 1;
        this.cellBoard[randomX + 1][randomY].num += 1;
        this.cellBoard[randomX + 1][randomY + 1].num += 1;
        this.cellBoard[randomX + 1][randomY - 1].num += 1;
        this.cellBoard[randomX - 1][randomY].num += 1;
        this.cellBoard[randomX - 1][randomY + 1].num += 1;
        this.cellBoard[randomX - 1][randomY - 1].num += 1;
        this.minesCount -= 1;
      }
    }
    console.log(toJS(this.cellBoard));
  }

  start() {
    this.gameState = GameState.START;
  }

  timer() {
    setTimeout(() => {
      this.time += 1;
    }, 1000);
  }

  end() {
    this.gameState = GameState.OVER;
    for (let i = 0; i < this.width + 2; i++) {
      for (let j = 0; j < this.height + 2; j++) {
        this.cellBoard[i][j].isEmpty = false;
      }
    }
  }

  reset() {
    this.initBoard();
    this.initMines();
  }
}

export default new GameStore();
