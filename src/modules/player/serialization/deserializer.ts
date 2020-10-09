import { IPlayerData } from "../types";

export function deserializePlayer(player: IPlayerData) {
	const { value, ...otherProps } = player;
	const newValue = value === null || value === undefined
		? undefined
		: value;



	return { ...otherProps, value: newValue };
}
