import React from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { GameState } from '../types/GameState';

const Header = observer(() => {
  const { gameStore: store } = useStores();

  const handleClickReset = () => {
    store.reset();
  };

  return (
    <HeaderWrapper>
      <div>{store.remainingMinesCount}</div>
      <button onClick={handleClickReset}>{store.gameState === GameState.SUCCESS ? '😍' : '😊'}</button>
      <div>{store.time}</div>
    </HeaderWrapper>
  );
});

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 1rem;
`;
export default Header;
