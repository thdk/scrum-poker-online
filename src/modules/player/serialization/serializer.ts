import firebase from "firebase/app";

import { IPlayer } from "../types";

export function serializePlayer(player: Partial<IPlayer> | null) {
	if (player === null) throw new Error("Saving null is not supported");

	const { value, ...otherProps } = player;
	const newValue = value === undefined
		? null
		: value;



	return { ...otherProps, value: newValue, modified: firebase.firestore.FieldValue.serverTimestamp() };
}