import * as React from 'react';
import { IPlayer } from '../../modules/player/types';
import Cards from '../../components/cards';
import { PlayerBoard } from '../../components/player-board';
import { Content } from '../../components/content';

export type GameScreenProps = {
  player: IPlayer;
};

export const GameScreen = (props: GameScreenProps) => {
  const { player } = props;

  return (
    <Content className="player-board">
      {player.value
        ? <PlayerBoard />
        : <Cards />}
    </Content>
  );
};
