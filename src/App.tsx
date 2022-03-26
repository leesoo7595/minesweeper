import React from 'react';
import Container from './components/Container';
import Header from './components/Header';
import Board from './components/Board';
import styled from 'styled-components';

function App() {
  return (
    <Root>
      <Container>
        <Header />
        <Board />
      </Container>
    </Root>
  );
}

const Root = styled.div`
  height: 100vh;
`;

export default App;
