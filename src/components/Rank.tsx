import React from 'react';
import useStores from '../stores';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const Rank: React.FC = () => {
  const { gameStore: store } = useStores();

  return (
    <RankWrapper>
      <ol>
        {store.getRank().map((rank, index) => (
          <li key={index}>{rank}</li>
        ))}
      </ol>
    </RankWrapper>
  );
};

const RankWrapper = styled.div`
  width: 50%;
`;

export default observer(Rank);
