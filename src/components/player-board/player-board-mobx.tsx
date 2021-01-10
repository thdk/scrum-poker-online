import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import {
  getFieldPlayersSorted, getIsWaitingForPlayer, getPlayer,
} from '../../modules/app/selectors';
import { PlayerBoard } from './player-board';
import { useStore } from '../../modules/app/store/use-app-store';

export const PlayerBoardMobx = observer(({
  readonly,
}: {
  readonly?: boolean;
}) => {
  const store = useStore();

  const player = getPlayer(store);
  const players = getFieldPlayersSorted(store);

  const isWaitingforPlayer = getIsWaitingForPlayer(store);

  const handleOnRestart = useCallback(() => {
    store.playerStore.restart();
  }, [store.playerStore]);

  const handleOnPlayerClick = useCallback((id: string) => {
    store.playerStore.updateDocument({
      isSparePlayer: true,
      value: undefined,
    }, id);
  }, [store.playerStore]);

  return player?.session
    ? (
      <PlayerBoard
        players={players}
        session={player.session}
        onRestart={readonly
          ? undefined
          : handleOnRestart}
        isWaitingForPlayer={isWaitingforPlayer}
        onPlayerClick={readonly
          ? undefined
          : handleOnPlayerClick}
      />
    )
    : <></>;
});
