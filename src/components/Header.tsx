import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderWrapper>
      <div>mine count</div>
      <button>reset button</button>
      <div>timer</div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 1rem;
`;
export default Header;
