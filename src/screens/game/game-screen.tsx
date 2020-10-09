import * as React from "react";
import { IPlayer } from "../../modules/player/types";
import Cards from "../../components/cards";
import PlayerBoard  from "../../components/player-board";

export type GameScreenProps = {
	player: IPlayer;
}

export const GameScreen = (props: GameScreenProps) => {
	const {player} = props;

	if (player.value) {
		return <PlayerBoard/>;
	} else {
		return <Cards/>
	}
};
