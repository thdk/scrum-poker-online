import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Cards from '../../components/cards';
import { PlayerBoard } from '../../components/player-board';
import { getPlayer } from '../../modules/app/selectors';
import { useStore } from '../../modules/app/store/use-app-store';
import { ContentWrapper } from '../../components/content-wrapper';
import { PlayerBench } from '../../components/player-bench';

export const GameScreenMobx = observer(() => {
  const store = useStore();
  const player = getPlayer(store, true);

  return (
    <ContentWrapper>
      {(player.value !== undefined || player.isSparePlayer)
        ? (
          <>
            <PlayerBoard />
            <PlayerBench />
          </>
        )
        : <Cards />}
    </ContentWrapper>
  );
});
