import * as React from 'react';
import { Doc } from 'firestorable';
import classNames from 'classnames';

import { IPlayer } from '../../modules/player/types';
import { Content } from '../content';

import './player-board.css';

export function PlayerBoard({
  isWaitingForPlayer,
  players,
  session,
  onRestart,
  onPlayerClick,
}: {
  players: Doc<IPlayer>[];
  session: string;
  isWaitingForPlayer: boolean;

  onRestart?: () => void;
  onPlayerClick?: (playerId: string) => void;
}) {
  return (
    <Content className="player-board">
      <h2>
        <span>Session: </span>
        {session}
      </h2>
      <div className="player-board-ranking">
        {
          players.map((p) => {
            const { value } = p.data!;
            const hiddenValue = p.data!.value !== undefined
              ? <>[v]</>
              : <>[x]</>;

            const styles = classNames({
              'player-board-rank--value': p.data!.value !== undefined,
            });

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
      {onRestart
        ? (
          <input
            style={{ marginTop: '4em' }}
            type="button"
            value="Restart"
            onClick={onRestart}
          />
        )
        : null}
    </Content>
  );
}
