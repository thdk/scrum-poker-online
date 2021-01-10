import * as React from 'react';
import {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import copy from 'copy-to-clipboard';
import firebase from 'firebase/app';
import { IPlayer } from '../../modules/player/types';

import { Content } from '../content';
import { FormField } from '../form-field';

export type PlayerFormProps = {
  player?: Partial<IPlayer>;
  onSave: (player: Partial<IPlayer>) => void;
};

export const PlayerForm = (props: PlayerFormProps) => {
  const { onSave, player: { name = '', session = '' } = {} } = props;

  const [playerName, setPlayerName] = useState(name);
  const [playerSession, setPlayerSession] = useState(session);

  useEffect(() => {
    setPlayerSession(session);
  }, [
    session,
  ]);

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, [setPlayerName]);

  const handleChangeSession = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerSession(e.target.value);
  }, [setPlayerSession]);

  const onShareLinkClick = useCallback(
    (sessionCode: string) => {
      copy(`${window.location.origin}/settings?session=${encodeURI(sessionCode.trim())}`, {});
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!playerName) {
      return;
    }

    onSave({ name: playerName, session: playerSession.trim() });
  },
  [
    onSave,
    playerName,
    playerSession,
  ]);

  const handleLogout = useCallback(() => {
    firebase.auth().signOut();
  }, []);
  const ShareLink = useMemo(() => ({ sessionCode }: { sessionCode: string }) => {
    if (!sessionCode) return null;

    return (
      <a
        href="#"
        className="share-link"
        onClick={(e) => { e.preventDefault(); onShareLinkClick(sessionCode); }}
      >
        Copy share link
      </a>
    );
  }, [onShareLinkClick]);

  return (
    <div className="player-form">
      <Content className="player-form-fields">
        <FormField type="text" label="Session code" value={playerSession} onChange={handleChangeSession} />

        <FormField type="text" label="Player name" value={playerName} onChange={handleChangeName} />

        <ShareLink sessionCode={playerSession} />

        <FormField type="button" value="Save" onClick={handleSave} />
        <FormField type="button" value="Logout" onClick={handleLogout} />
      </Content>
    </div>
  );
};
