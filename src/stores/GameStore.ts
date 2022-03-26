import { makeAutoObservable, action, observable, toJS } from 'mobx';
import { CellEnum, CellState } from '../types/Cell';
import { GameState } from '../types/GameState';

const initCellState: CellState = {
  isOpen: true,
  isFlag: false,
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
      setFlag: action,
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
  timerId = 0;

  private initBoard() {
    for (let i = 0; i < this.width + 2; i++) {
      this.cellBoard[i] = [];
      for (let j = 0; j < this.height + 2; j++) {
        this.cellBoard[i][j] = { ...initCellState };
        this.cellBoard[i][j].isOpen = false;
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
    let count = this.minesCount;
    while (count > 0) {
      const randomX = Math.floor(Math.random() * this.width + 1);
      const randomY = Math.floor(Math.random() * this.height + 1);
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
        count -= 1;
      }
    }
    console.log(toJS(this.cellBoard));
  }

  start() {
    this.gameState = GameState.START;
    this.timer();
  }

  timer() {
    this.timerId = window.setInterval(() => {
      this.setTimer();
    }, 1000);
  }

  end() {
    this.gameState = GameState.OVER;
    for (let i = 0; i < this.width + 2; i++) {
      for (let j = 0; j < this.height + 2; j++) {
        this.cellBoard[i][j].isOpen = true;
      }
    }
    window.clearInterval(this.timerId);
    this.timerId = 0;
  }

  reset() {
    window.clearInterval(this.timerId);
    this.time = 0;
    this.timerId = 0;
    this.gameState = GameState.READY;
    this.minesCount = 10;
    this.cellBoard = [];
    this.initBoard();
    this.initMines();
  }

  setOpenCell(x: number, y: number) {
    if (this.cellBoard[x][y].display === CellEnum.WALL) return;
    if (this.cellBoard[x][y].isOpen) return;
    this.cellBoard[x][y].isOpen = true;
    this.cellBoard[x][y].display = CellEnum.NUM;

    if (!this.cellBoard[x][y].num) {
      this.setOpenCell(x, y + 1);
      this.setOpenCell(x, y - 1);
      this.setOpenCell(x + 1, y);
      this.setOpenCell(x + 1, y + 1);
      this.setOpenCell(x + 1, y - 1);
      this.setOpenCell(x - 1, y);
      this.setOpenCell(x - 1, y + 1);
      this.setOpenCell(x - 1, y - 1);
    }
  }

  setFlag(x: number, y: number) {
    if (this.cellBoard[x][y].isOpen) return;
    this.cellBoard[x][y].isFlag = !this.cellBoard[x][y].isFlag;
    if (this.cellBoard[x][y].isFlag) {
      this.minesCount -= 1;
    } else {
      this.minesCount += 1;
    }
    console.log('flag', this.cellBoard[x][y].display);
  }

  setTimer() {
    this.time += 1;
  }
}

export default new GameStore();
