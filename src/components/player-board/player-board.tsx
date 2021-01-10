import * as React from 'react';
import { useCallback } from 'react';
import { Doc } from 'firestorable';
import classNames from 'classnames';

import { IPlayer } from '../../modules/player/types';
import { Content } from '../content';

import './player-board.css';

export type PlayerBoardProps = {
  players: Doc<IPlayer>[];
  session: string;
  isWaitingForPlayer: boolean;

  onRestart: () => void;
  onPlayerClick?: (playerId: string) => void;
};

export const PlayerBoard = (props: PlayerBoardProps) => {
  const {
    isWaitingForPlayer,
    players,
    session,
    onRestart,
    onPlayerClick,
  } = props;

  const handleRestartClick = useCallback(onRestart, [onRestart]);

  return (
    <Content className="player-board">
      <h2>
        Session:
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
      <input
        style={{ marginTop: '4em' }}
        type="button"
        value="Restart"
        onClick={handleRestartClick}
      />
    </Content>
  );
};
