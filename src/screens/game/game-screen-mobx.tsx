import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Cards from '../../components/cards';
import { PlayerBoard } from '../../components/player-board';
import { getPlayer } from '../../modules/app/selectors';
import { useStore } from '../../modules/app/store/use-app-store';

export const GameScreenMobx = observer(() => {
  const store = useStore();
  const player = getPlayer(store, true);

  if (player.value !== undefined || player.isSparePlayer) {
    return <PlayerBoard />;
  }
  return <Cards />;
});
