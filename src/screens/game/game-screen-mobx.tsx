import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Cards from '../../components/cards';
import { PlayerBoard } from '../../components/player-board';
import { ContentWrapper } from '../../components/content-wrapper';
import { PlayerBench } from '../../components/player-bench';
import { usePlayerStore } from '../../modules/player/use-player-store';

export const GameScreenMobx = observer(() => {
  const playerStore = usePlayerStore();

  if (!playerStore.player) {
    return null;
  }

  return (
    <ContentWrapper>
      {(playerStore.player.value !== undefined || playerStore.player.isSparePlayer)
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
