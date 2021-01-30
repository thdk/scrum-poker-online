import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { PlayerBoard } from './player-board';
import { usePlayerStore } from '../../modules/player/use-player-store';

export const PlayerBoardMobx = observer(({
  readonly,
}: {
  readonly?: boolean;
}) => {
  const playerStore = usePlayerStore();

  const handleOnRestart = useCallback(() => {
    playerStore.restart();
  }, [playerStore]);

  const handleOnRedraw = useCallback(
    () => {
      playerStore.updatePlayerAsync({ value: undefined });
    },
    [
      playerStore,
    ],
  );

  const handleOnPlayerClick = useCallback((id: string) => {
    playerStore.updateDocument({
      isSparePlayer: true,
      value: undefined,
    }, id);
  }, [playerStore]);

  return playerStore.player?.session
    ? (
      <PlayerBoard
        players={playerStore.fieldPlayersSorted}
        session={playerStore.player.session}
        onRestart={readonly
          ? undefined
          : handleOnRestart}
        onRedraw={
          (readonly || playerStore.player?.isSparePlayer)
            ? undefined
            : handleOnRedraw
        }
        isWaitingForPlayer={playerStore.isWaitingForPlayer}
        onPlayerClick={readonly
          ? undefined
          : handleOnPlayerClick}
      />
    )
    : <></>;
});
