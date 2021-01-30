import { IPlayerData } from '../types';

export function deserializePlayer(player: IPlayerData) {
  const {
    value, session, field, ...otherProps
  } = player;
  const newValue = value === null || value === undefined
    ? undefined
    : value;

  const newSession = session === null || session === undefined
    ? undefined
    : session;

  return {
    ...otherProps,
    value: newValue,
    session: newSession,
    field: field || 1,
  };
}
