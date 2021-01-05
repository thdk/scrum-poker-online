import * as React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks";
import { getFieldPlayersSorted, getIsWaitingForPlayer, getSparePlayers } from "../../modules/app/selectors";
import { PlayerBoard } from "./player-board";
import { useCallback } from "react";
import { PlayerBench } from "../player-bench";
import { ContentWrapper } from "../content-wrapper";
import { PlayerType } from "../../modules/player/types";

const PlayerBoardMobx = () => {
	const store = useStore();

	const session = store.playerStore.player.session;
	const players = getFieldPlayersSorted(store);
	const sparePlayers = getSparePlayers(store);
	const isWaitingforPlayer = getIsWaitingForPlayer(store);

	const handleOnRestart = useCallback(() => {
		store.playerStore.restart();
	}, [store.playerStore]);

	const handleOnPlayerClick = useCallback((id: string) => {
		if (store.playerStore.player.type !== PlayerType.host) {
			return;
		}

		store.playerStore.updateDocument({
			isSparePlayer: true,
			value: undefined,
		}, id)
	}, [store.playerStore]);

	const handleOnSparePlayerClick = useCallback((id: string) => {
		if (store.playerStore.player.type !== PlayerType.host) {
			return;
		}

		store.playerStore.updateDocument({
			isSparePlayer: false,
		}, id)
	}, [store.playerStore]);

	return session ?
		<ContentWrapper>
			<PlayerBoard
				players={players}
				session={session}
				onRestart={handleOnRestart}
				isWaitingForPlayer={isWaitingforPlayer}
				onPlayerClick={handleOnPlayerClick}
			/>
			<PlayerBench
				sparePlayers={sparePlayers}
				onPlayerClick={
					store.playerStore.player.type === PlayerType.host
						? handleOnSparePlayerClick
						: undefined
				}
			/>
		</ContentWrapper>
		: <></>;
};

export default observer(PlayerBoardMobx);