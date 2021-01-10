import * as React from 'react';
import { useCallback, useState, useMemo } from 'react';
import copy from 'copy-to-clipboard';
import firebase from 'firebase/app';
import { IPlayer, PlayerType } from '../../modules/player/types';

import { Content } from '../content';
import { FormField } from '../form-field';

export type PlayerFormProps = {
  player?: Partial<IPlayer>;
  onSave: (player: Partial<IPlayer>) => void;
};

export const PlayerForm = (props: PlayerFormProps) => {
  const { onSave, player: { name = '', session = '', type = PlayerType.player } = {} } = props;

  const [playerName, setPlayerName] = useState(name);
  const [playerSession, setPlayerSession] = useState(session);
  const [playertype, setPlayerType] = useState(type);

  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  }, [setPlayerName]);

  const handleChangeSession = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerSession(e.target.value);
  }, [setPlayerSession]);

  const handleChangePlayertype = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerType(e.target.checked ? PlayerType.host : PlayerType.player);
  }, []);

  const onShareLinkClick = useCallback(
    (sessionCode: string) => {
      copy(`${window.location.origin}?session=${encodeURI(sessionCode.trim())}`, {});
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (playertype === PlayerType.player && !playerName) {
      return;
    }

    onSave({ name: playerName, type: playertype, session: playerSession.trim() });
  }, [onSave, playerName, playerSession, playertype]);

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
        <FormField type="checkbox" label="Tv mode" checked={playertype === PlayerType.host} onChange={handleChangePlayertype} />

        <FormField type="text" label="Session code" value={playerSession} onChange={handleChangeSession} />

        {
          playertype === PlayerType.player
            ? <FormField type="text" label="Player name" value={playerName} onChange={handleChangeName} />
            : null
        }

        <ShareLink sessionCode={playerSession} />

        <FormField type="button" value="Save" onClick={handleSave} />
        <FormField type="button" value="Logout" onClick={handleLogout} />
      </Content>
    </div>
  );
};
