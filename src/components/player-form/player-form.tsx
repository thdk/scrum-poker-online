import * as React from 'react';
import {
  useCallback, useState, useMemo, useEffect,
} from 'react';
import copy from 'copy-to-clipboard';
import { getAuth, signOut } from 'firebase/auth';
import { IPlayer } from '../../modules/player/types';

import { Content } from '../content';
import { FormField } from '../form-field';
import { usePlayerStore } from '../../modules/player/use-player-store';

export type PlayerFormProps = {
  player?: Partial<IPlayer>;
  onSave: (player: Partial<IPlayer>) => void;
};

export const PlayerForm = (props: PlayerFormProps) => {
  const {
    onSave,
    player: {
      name = '',
      session = '',
      isSparePlayer = false,
      field = 1,
    } = {},
  } = props;

  const [playerName, setPlayerName] = useState(name);
  const [playerSession, setPlayerSession] = useState(session);
  const [playerField, setPlayerField] = useState(field);

  const playerStore = usePlayerStore();

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

  const handleIsSparePlayerChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    playerStore.savePlayer({
      isSparePlayer: e.target.checked,
    });
  }, [playerStore]);

  const handlePlayerFieldChanged = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerField(+e.target.value);
  }, []);

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

    onSave({ name: playerName, session: playerSession.trim(), field: playerField });
  },
  [
    onSave,
    playerField,
    playerName,
    playerSession,
  ]);

  const handleLogout = useCallback(() => {
    signOut(getAuth());
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
        <FormField
          type="text"
          label="Session code"
          value={playerSession}
          onChange={handleChangeSession}
        />

        <FormField
          type="text"
          label="Player name"
          value={playerName}
          onChange={handleChangeName}
        />

        <FormField
          label="Field"
          component={(
            <select
              value={playerField}
              onChange={handlePlayerFieldChanged}
            >
              <option
                label="field 1"
                value={1}
              />
              <option
                label="field 2"
                value={2}
              />
            </select>
          )}
        />

        <FormField
          type="checkbox"
          label="Spare player"
          checked={isSparePlayer}
          onChange={handleIsSparePlayerChanged}
        />

        <ShareLink sessionCode={playerSession} />

        <FormField type="button" value="Save" onClick={handleSave} />
        <FormField type="button" value="Logout" onClick={handleLogout} />
      </Content>
    </div>
  );
};
