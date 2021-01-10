import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { usePlayerStore } from '../../modules/player/use-player-store';
import { PlayerBench } from './player-bench';

export const PlayerBenchMobx = observer(() => {
  const playerStore = usePlayerStore();

  const handleOnSparePlayerClick = useCallback((id: string) => {
    playerStore.updateDocument({
      isSparePlayer: false,
    }, id);
  }, [playerStore]);

  return (
    <PlayerBench
      sparePlayers={playerStore.sparePlayers}
      onPlayerClick={handleOnSparePlayerClick}
    />
  );
});
