import React, { PropsWithChildren } from 'react';
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
import { TvPage } from '../../pages/tv';
import { PlayerPage } from '../../pages/players';
import { useAuthenticatedUser } from '../../modules/auth';

const AuthenticatedRoute = ({
  children,
  requireSession = true,
}: PropsWithChildren<{
  requireSession?: boolean
}>) => {
  const user = useAuthenticatedUser();

  // eslint-disable-next-line no-console
  console.log({
    user,
  });
  if (!user) {
    return <Redirect to="/login" />;
  }

  if (!user.session && requireSession) {
    return <Redirect to="/settings" />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <AuthenticatedRoute>
            <Redirect to="/game" />
          </AuthenticatedRoute>
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/game">
          <AuthenticatedRoute>
            <GamePage />
          </AuthenticatedRoute>
        </Route>
        <Route path="/settings">
          <AuthenticatedRoute
            requireSession={false}
          >
            <SettingsPage />
          </AuthenticatedRoute>
        </Route>
        <Route path="/tv">
          <AuthenticatedRoute>
            <TvPage />
          </AuthenticatedRoute>
        </Route>
        <Route path="/players">
          <AuthenticatedRoute>
            <PlayerPage />
          </AuthenticatedRoute>
        </Route>
      </Switch>
    </>
  );
}
