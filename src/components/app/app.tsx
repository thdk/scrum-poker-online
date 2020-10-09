import React from 'react';
import './app.css';
import { WelcomeScreen } from '../../screens/welcome';
import GameScreen from '../../screens/game';
import Header from '../header';

export type AppProps = {
  screen: "game" | "settings";
};

export const App = (props: AppProps) => {
  const { screen } = props;

  return (
    <div>
      <Header />
      {
        screen  === "game" ?
          <GameScreen />
          : <WelcomeScreen />
      }
    </div>
  );
}
