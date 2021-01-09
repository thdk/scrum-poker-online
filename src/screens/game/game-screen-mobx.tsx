import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Cards from '../../components/cards';
import PlayerBoard from '../../components/player-board';
import { getPlayer } from '../../modules/app/selectors';
import { PlayerType } from '../../modules/player/types';
import { useStore } from '../../modules/app/store/use-app-store';

const GameScreenMobx = () => {
  const store = useStore();
  const player = getPlayer(store, true);

  if (player.type === PlayerType.host
		|| (
		  player.value !== undefined
			|| player.isSparePlayer
		)
  ) {
    return <PlayerBoard />;
  }
  return <Cards />;
};

export default observer(GameScreenMobx);
