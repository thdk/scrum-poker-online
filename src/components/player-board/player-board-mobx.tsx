import * as React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks";
import { getAllPlayersSorted, getSessionCode, getIsWaitingForPlayer } from "../../modules/app/selectors";
import { PlayerBoard } from "./player-board";
import { useCallback } from "react";

const PlayerBoardMobx = () => {
	const store = useStore();

	const session = getSessionCode(store);
	const players = getAllPlayersSorted(store);
	const isWaitingforPlayer = getIsWaitingForPlayer(store);

	const handleOnRestart = useCallback(() => {
		store.playerStore.restart();
	}, [store.playerStore]);

	return session ?
		<PlayerBoard
			players={players}
			session={session}
			onRestart={handleOnRestart}
			isWaitingForPlayer={isWaitingforPlayer}
		/>
		: <></>;
};

export default observer(PlayerBoardMobx);