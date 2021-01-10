import { PlayCard } from '../../cards';

export interface IPlayer {
  name?: string;
  session?: string;
  value?: PlayCard | null;
  uid: string;
  isSparePlayer?: boolean;
}

export interface IPlayerData {
  name: string;
  session: string | null;
  value?: PlayCard | null;
  uid: string;
  isSparePlayer?: boolean;
}
