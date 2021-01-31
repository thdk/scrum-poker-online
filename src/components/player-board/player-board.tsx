import * as React from 'react';
import { Doc } from 'firestorable';
import classNames from 'classnames';

import { IPlayer } from '../../modules/player/types';

import './player-board.css';

export function PlayerBoard({
  isWaitingForPlayer,
  players,
  onPlayerClick,
}: {
  players: Doc<IPlayer>[];
  isWaitingForPlayer: boolean;
  onPlayerClick?: (playerId: string) => void;
}) {
  if (!players.length) {
    return null;
  }
  return (
    <div className="player-board-ranking">
      {
          players.map((p) => {
            const { value } = p.data!;
            const hiddenValue = p.data!.value !== undefined
              ? <>[v]</>
              : <>[x]</>;

            const styles = classNames(
              'player-board-rank',
              {
                'player-board-rank--value': p.data!.value !== undefined,
              },
            );

            return (
              <div
                className={styles}
                key={p.data!.uid}
                onClick={onPlayerClick
                  ? () => onPlayerClick(p.data!.uid)
                  : undefined}
              >
                {isWaitingForPlayer ? hiddenValue : value}
                {' '}
                -
                {p.data!.name}
              </div>
            );
          })
        }
    </div>
  );
}
