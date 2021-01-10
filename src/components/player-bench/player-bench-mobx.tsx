import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { getSparePlayers } from '../../modules/app/selectors';
import { useStore } from '../../modules/app/store/use-app-store';
import { PlayerBench } from './player-bench';

export const PlayerBenchMobx = observer(() => {
  const store = useStore();

  const sparePlayers = getSparePlayers(store);

  const handleOnSparePlayerClick = useCallback((id: string) => {
    store.playerStore.updateDocument({
      isSparePlayer: false,
    }, id);
  }, [store.playerStore]);

  return (
    <PlayerBench
      sparePlayers={sparePlayers}
      onPlayerClick={handleOnSparePlayerClick}
    />
  );
});
