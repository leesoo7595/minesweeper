import React from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  const { gameStore: store } = useStores();

  const handleClickReset = () => {
    store.reset();
  };

  return (
    <HeaderWrapper>
      <div>{store.minesCount}</div>
      <button onClick={handleClickReset}>😊</button>
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
