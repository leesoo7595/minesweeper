import React from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { GameState } from '../types/GameState';

const Header: React.FC = () => {
  const { gameStore: store } = useStores();

  const handleClickReset = () => {
    store.reset();
  };

  return (
    <HeaderWrapper>
      <div>{store.remainingMinesCount}</div>
      <button onClick={handleClickReset}>{getGameStateEmoji(store.gameState)}</button>
      <div>{store.time}</div>
    </HeaderWrapper>
  );
};

function getGameStateEmoji(gameState: GameState) {
  switch (gameState) {
    case GameState.SUCCESS:
      return '😍';
    case GameState.READY:
      return '😊';
    case GameState.OVER:
      return '😩';
    default:
      return '😊';
  }
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 1rem;
`;

export default observer(Header);
