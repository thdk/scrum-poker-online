import React from 'react';
import { Content } from '../../components/content';
import { PlayerList } from '../../components/player-list';

export const PlayerPage = () => (
  <Content>
    <h2>Manage the players in your team</h2>
    <PlayerList />
  </Content>
);
