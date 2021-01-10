import React from 'react';
import './app.css';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from '../header';
import { GamePage } from '../../pages/game';
import { SettingsPage } from '../../pages/settings';
import { LoginPage } from '../../pages/login';

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
      </Switch>
    </>
  );
}
