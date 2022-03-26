import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: JSX.Element[];
}
function Container({ children }: ContainerProps) {
  return <ContainerWrapper>{children}</ContainerWrapper>;
}

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  margin: 25%;
  border: 1px solid gray;
`;

export default Container;
