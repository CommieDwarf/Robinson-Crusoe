import React from "react";
import styles from "./PlayerOverview.module.css";
import { useAppSelector } from "../../../../store/hooks";
import { Player } from "./Player/Player";
import { playerContainerAspectRatio } from "./Player/aspectRatio";

export function PlayerOverview() {
	const players = useAppSelector((state) => state.gameSession.data?.players);

	return (
		<div className={styles.container}>
			{players &&
				players.map((player) => {
					return (
						<div
							key={player.id}
							className={styles.playerWrapper}
							style={{ aspectRatio: playerContainerAspectRatio }}
						>
							<Player player={player} />
						</div>
					);
				})}
		</div>
	);
}
