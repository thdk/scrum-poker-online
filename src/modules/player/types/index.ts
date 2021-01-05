import { PlayCard } from "../../app/store";

export enum PlayerType {
	player = 0,
	host = 1,
}

export interface IPlayer {
	name?: string;
	session?: string;
	type: PlayerType;
	value?: PlayCard | null;
	uid: string;
	isSparePlayer?: boolean;
}


export interface IPlayerData {
	name: string;
	session: string | null;
	type: PlayerType;
	value?: PlayCard | null;
	uid: string;
	isSparePlayer?: boolean;
}
