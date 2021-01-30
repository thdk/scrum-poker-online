import { PlayCard } from '../../cards';

export interface IPlayer {
  name?: string;
  session?: string;
  value?: PlayCard | null;
  uid: string;
  isSparePlayer?: boolean;
  field: number;
}

export interface IPlayerData {
  name: string;
  session: string | null;
  value?: PlayCard | null;
  uid: string;
  isSparePlayer?: boolean;
  field?: number;
}
