import React from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Board from './components/Board';
import styled from 'styled-components';
import Rank from './components/Rank';

function App() {
  return (
    <Root>
      <Container>
        <Header />
        <Board />
      </Container>
      <Rank />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default App;
