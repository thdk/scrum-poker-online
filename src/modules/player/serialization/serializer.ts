import firebase from 'firebase/app';

import { IPlayer } from '../types';

export function serializePlayer(player: Partial<IPlayer> | null) {
  if (player === null) throw new Error('Saving null is not supported');

  const { value, session, ...otherProps } = player;
  const newValue = value === undefined
    ? null
    : value;

  const newSession = session === undefined
    ? null
    : session;

  return {
    ...otherProps,
    value: newValue,
    session: newSession,
    modified: firebase.firestore.FieldValue.serverTimestamp(),
  };
}
