import React, { MouseEvent } from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { GameState } from '../types/GameState';
import { observer } from 'mobx-react-lite';
import { CellEnum, CellState } from '../types/Cell';
import { EventMouseButton } from '../types/Event';

const Board: React.FC = () => {
  const { gameStore: store } = useStores();

  const handleLeftClick = (col: number, row: number) => {
    store.isCellMineOrFlag(col, row);
    store.setOpenCell(col, row);
  };

  const handleRightClick = (col: number, row: number) => {
    store.setFlag(col, row);
    store.isSuccess();
  };

  const handleClick = (e: MouseEvent) => {
    if (store.gameState !== GameState.START) {
      store.start();
    }
    const target = e.target as HTMLElement;
    const [col, row] = target.id.split('-').map(Number);
    if (e.button === EventMouseButton.RIGHT_CLICK) handleRightClick(col, row);
    if (e.button === EventMouseButton.LEFT_CLICK) handleLeftClick(col, row);
  };

  return (
    <BoardWrapper width={store.width} height={store.height} onMouseDown={handleClick} onContextMenu={e => e.preventDefault()}>
      {store.cellBoard.map((col, cIndex) =>
        col.map((cell, index) => {
          if (cell.display === CellEnum.WALL) return;
          return (
            <Cell id={`${cIndex}-${index}`} key={`${cIndex}-${index}`} isOpen={cell.isOpen}>
              {getDisplayCell(cell)}
            </Cell>
          );
        }),
      )}
    </BoardWrapper>
  );
};

function getDisplayCell(cell: CellState) {
  if (cell.isOpen) {
    switch (cell.display) {
      case CellEnum.MINE:
        return '💣';
      case CellEnum.NUM:
        return cell.num ? cell.num : '';
    }
  } else if (cell.isFlag) {
    return '🏴';
  }
}

const BoardWrapper = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: ${({ width }) => `repeat(${width}, 1fr)`};
  grid-template-rows: ${({ height }) => `repeat(${height}, 1fr)`};
  width: 80%;
  height: 80%;
  border: 1px solid gray;
`;

const Cell = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  background-color: ${({ isOpen }) => (isOpen ? '#d3d3d3' : 'transparent')};
  cursor: pointer;
`;

export default observer(Board);
