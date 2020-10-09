import React from "react";
import { useCallback } from "react";

import { observer } from "mobx-react-lite";

import { PlayerForm } from "./player-form";
import { useStore } from "../../hooks";
import { getPlayer, getSessionCode } from "../../modules/app/selectors";
import { IPlayer } from "../../modules/player/types";
import { savePlayer } from "../../modules/app/modifiers";

import "./player-form.css";

const PlayerFormContainer = () => {
	const store = useStore();
	const session = getSessionCode(store);

	const player = { ...getPlayer(store), session };

	const onSave = useCallback((data: IPlayer) => {
		savePlayer(store, data);
	}, [store]);

	return <PlayerForm
		onSave={onSave}
		player={player}
	/>
}

export default observer(PlayerFormContainer);
