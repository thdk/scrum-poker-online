import * as React from "react";
import { useCallback } from "react";
import { Doc } from "firestorable";
import classNames from "classnames";

import { IPlayer } from "../../modules/player/types";
import { Content } from "../content";
import { ContentWrapper } from "../content-wrapper";

import "./player-board.css";

export type PlayerBoardProps = {
	players: Doc<IPlayer>[];
	session: string;
	isWaitingForPlayer: boolean;

	onRestart: () => void;
};

export const PlayerBoard = (props: PlayerBoardProps) => {
	const { isWaitingForPlayer, players, session, onRestart } = props;

	const handleRestartClick = useCallback(onRestart, [onRestart]);

	return <ContentWrapper>
		<Content className="player-board">
			<h2>Session: {session}</h2>
			<div className="player-board-ranking">
				{
					players.map(p => {
						const value = isWaitingForPlayer
							? p.data!.value !== undefined
								? <>[v]</>
								: <>[x]</>
							: p.data!.value;

						const styles = classNames({ "player-board-rank--value": p.data!.value !== undefined });

						return <div className={styles} key={p.data!.name}>
							{value} - {p.data!.name}
						</div>
					}
					)}
			</div>
			<input
				style={{ marginTop: "4em" }}
				type="button"
				value={"Restart"}
				onClick={handleRestartClick}
			/>
		</Content>
	</ContentWrapper>;
};
