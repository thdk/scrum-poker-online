import * as React from "react";
import Cards from "../../components/cards";
import PlayerBoard  from "../../components/player-board";
import { observer } from "mobx-react-lite";
import { getPlayer } from "../../modules/app/selectors";
import { useStore } from "../../hooks";
import {PlayerType} from "../../modules/player/types";

const GameScreenMobx = () => {
    const store = useStore();
    const player = getPlayer(store, true);

	if (player.type === PlayerType.host || player.value !== undefined) {
		return <PlayerBoard/>;
	} else {
		return <Cards/>
	}
};

export default observer(GameScreenMobx);
