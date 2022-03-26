import React, { MouseEvent } from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { GameState } from '../types/GameState';
import { observer } from 'mobx-react-lite';
import { CellEnum, CellState } from '../types/Cell';

function getDisplayCell(cell: CellState) {
  if (!cell.isEmpty) {
    switch (cell.display) {
      case CellEnum.FLAG:
        return '깃발';
      case CellEnum.MINE:
        return '지뢰';
      case CellEnum.NUM:
        return cell.num;
    }
  }
}

const Board = observer(() => {
  const { gameStore: store } = useStores();

  const handleClick = (e: MouseEvent) => {
    if (store.gameState !== GameState.START) {
      store.start();
    }

    const target = e.target as HTMLElement;
    const [col, row] = target.id.split('-').map(str => Number(str));

    if (store.cellBoard[col][row].display === CellEnum.MINE) {
      store.end();
    } else {
      store.cellBoard[col][row].isEmpty = false;
    }
  };

  return (
    <BoardWrapper width={store.width} height={store.height} onClick={handleClick}>
      {store.cellBoard.map((col, cIndex) =>
        col.map((cell, index) => {
          if (cell.display === CellEnum.WALL) return;
          return (
            <Cell id={`${cIndex}-${index}`} key={`${cIndex}-${index}`}>
              {getDisplayCell(cell)}
            </Cell>
          );
        }),
      )}
    </BoardWrapper>
  );
});

const BoardWrapper = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: ${({ width }) => `repeat(${width}, 1fr)`};
  grid-template-rows: ${({ height }) => `repeat(${height}, 1fr)`};
  width: 80%;
  height: 80%;
  border: 1px solid gray;
`;

const Cell = styled.div`
  text-align: center;
  border: 1px solid gray;
  cursor: pointer;
`;

export default Board;
