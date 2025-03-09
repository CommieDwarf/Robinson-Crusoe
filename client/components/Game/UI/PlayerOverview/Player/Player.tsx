import styles from "./Player.module.css";
import React from "react";
import { IPlayerRenderData } from "@shared/types/Game/PlayerService/Player";
import CharacterImg from "../../Character/CharacterImg/CharacterImg";
import Health from "../../Health/Health";
import { Expendables } from "../../Character/Expendables/Expendables";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import starImg from "/public/UI/icons/star.webp";
import Pawns from "../../Character/Pawns/Pawns";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { PlayerLatency } from "../../../../PlayerLatency/PlayerLatency";
import { useAppSelector } from "../../../../../store/hooks";
import { selectPlayerLatency } from "../../../../../reduxSlices/gameSession";

interface Props {
	player: IPlayerRenderData;
}

export function Player(props: Props) {
	const character = props.player.character!;

	const { t } = useTranslation();

	const latency = useAppSelector((state) =>
		selectPlayerLatency(state, character.playerId)
	);

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<div className={styles.latency}>
					<PlayerLatency latency={latency} />
				</div>
				<div className={styles.userNameWrapper}>
					<span
						className={`${styles.username} font-mono`}
						style={{ backgroundColor: props.player.color }}
					>
						{props.player.username}

						{props.player.prime && (
							<div className={styles.primePlayerIcon}>
								<DynamicImage
									src={starImg}
									alt={"prime player"}
								/>
							</div>
						)}
					</span>
				</div>
			</div>
			<div className={styles.characterWrapper}>
				<div className={styles.health}>
					<Health
						vertical={true}
						background={false}
						moraleThresholds={character.moraleThresholds}
						maxHealth={character.maxHealth}
						health={character.health}
						moraleThresholdsRemoved={
							character.moraleThresholdsRemoved
						}
					/>
				</div>

				<div className={styles.character}>
					<div className={styles.charName}>
						{capitalize(t(`character.${character.name}`))}
					</div>

					<div className={styles.imgWrapper}>
						<CharacterImg character={props.player.character!} />
					</div>
					<hr className={styles.hr} />
					<div className={styles.expendables}>
						<Expendables
							determination={character.determination}
							weapon={character.weaponBoost}
							wood={
								props.player.character?.hasPersonalResource
									.wood || false
							}
						/>
					</div>
					<hr className={styles.hr} />
					<div className={styles.pawns}>
						<Pawns
							character={character}
							pawns={character.pawnService.pawns}
							dragDisabled={true}
							droppableId={character.name}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
