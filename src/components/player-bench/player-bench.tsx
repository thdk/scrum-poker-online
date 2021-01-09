import React from 'react';
import { IPlayer } from '../../modules/player/types';
import { Content } from '../content';
import { ContentWrapper } from '../content-wrapper';

import './player-bench.css';

export function PlayerBench({
  sparePlayers,
  onPlayerClick,
}: {
  sparePlayers: IPlayer[],
  onPlayerClick?: (playerId: string) => void,
}) {
  return (
    <ContentWrapper>
      <Content
        className="player-bench"
        style={{
          alignItems: 'center',
        }}
      >
        <h3>Player bench</h3>
        {
                onPlayerClick
                  ? (
                    <div className="player-bench-info">
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: '1em',
                        }}
                      >
                        Swap players by clicking on their name.
                      </p>
                    </div>
                  )
                  : null

            }
        <div
          className="player-bench-players"
          style={{
            textAlign: 'center',
          }}
        >
          {
                    sparePlayers.length === 0
                      ? (
                        <p
                          style={{
                            fontSize: '0.5em',
                          }}
                        >
                          Player bench is empty
                        </p>
                      )
                      : null
                }
          {
                    sparePlayers.map((p) => (
                      <div
                        key={p.name}
                        onClick={onPlayerClick
                          ? () => onPlayerClick(p.uid)
                          : undefined}
                      >
                        {p.name}
                      </div>
                    ))
                }
        </div>
      </Content>
    </ContentWrapper>
  );
}
