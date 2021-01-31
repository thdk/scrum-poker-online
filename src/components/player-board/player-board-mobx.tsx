import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { PlayerBoard } from './player-board';
import { usePlayerStore } from '../../modules/player/use-player-store';
import { PlayerBoardActions } from '../player-board-actions';

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

  const session = playerStore.player?.session;
  return session
    ? (
      <>
        <h2
          className="player-boards__title"
        >
          <span>Session: </span>
          {session}
        </h2>
        <div
          className={`player-boards player-boards-${playerStore.numberOfFields}`}
        >
          {
            playerStore.fieldPlayersSorted.map((players, i) => (
              <PlayerBoard
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                players={players}
                isWaitingForPlayer={playerStore.isWaitingForPlayer}
                onPlayerClick={readonly
                  ? undefined
                  : handleOnPlayerClick}
              />
            ))
          }
        </div>
        <PlayerBoardActions
          canRedraw={playerStore.isWaitingForPlayer}
          onRestart={readonly
            ? undefined
            : handleOnRestart}
          onRedraw={
            (readonly || playerStore.player?.isSparePlayer)
              ? undefined
              : handleOnRedraw
          }
        />
      </>
    )
    : null;
});
