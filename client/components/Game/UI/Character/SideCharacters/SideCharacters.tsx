import React from "react";
import Pawn from "../../Pawn";
import styles from "./SideCharacters.module.css";
import { Droppable } from "react-beautiful-dnd";
import fridayPicImg from "/public/UI/characters/side-characters/friday-pic.webp";
import dogPicImg from "/public/UI/characters/side-characters/dog-pic.webp";
import dogUsageImg from "/public/UI/characters/dog-usage.webp";
import { useAppSelector } from "../../../../../store/hooks";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import determinationTokenImg from "/public/UI/tokens/determination.webp";
import { objectsEqual } from "@shared/utils/objectsEqual";
import { getOwnedDroppableId } from "@shared/utils/getOwnedDroppableId";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { selectGame } from "../../../../../reduxSlices/gameSession";
import Health from "../../Health/Health";

function SideCharacters() {
	const friday = useAppSelector(
		(state) => selectGame(state)?.characterService.friday
	);
	const dog = useAppSelector(
		(state) => selectGame(state)?.characterService.dog
	);

	const { t } = useTranslation();

	const difficultySettings = useAppSelector(
		(state) => state.gameSession.data?.settings.difficultySettings
	);

	if (!friday || !dog) return null;
	return (
		<div className={`${styles.container} tour-character-side-characters`}>
			<div className={styles.friday}>
				{!difficultySettings?.friday && (
					<div className={styles.disableOverlay}>
						<div className={styles.diagnal}>
							<DynamicImage
								src={"/UI/misc/cross-line.webp"}
								alt=""
							/>
						</div>
					</div>
				)}
				<Droppable
					droppableId={getOwnedDroppableId("friday", "character")}
				>
					{(provided) => (
						<div
							className={`${styles.pawn} ${styles.fridayPawn}`}
							id={"friday-droppable"}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{friday?.pawnService.freePawns.map((pawn, i) => {
								return (
									<Pawn
										pawn={pawn}
										context="character"
										index={i}
										key={pawn.draggableId}
										disabled={!difficultySettings?.friday}
									/>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<div className={`${styles.name}`}>
					{capitalize(t("character.friday"))}
				</div>
				<div className={styles.fridayHealth}>
					<Health
						background={false}
						moraleThresholds={[]}
						maxHealth={friday.maxHealth}
						health={friday.health}
					/>
				</div>
				<div className={styles.determination}>
					<div className={styles.determinationValue}>
						{friday.determination}
					</div>
					<div className={styles.determinationIcon}>
						<DynamicImage
							src={determinationTokenImg}
							alt={"determinacja"}
						/>
					</div>
				</div>
				<div className={styles.fridayPic}>
					<DynamicImage
						src={fridayPicImg}
						fill
						alt="Piętaszek"
						sizes={styles.picture}
					/>
				</div>
			</div>
			<div className={styles.dog}>
				{!difficultySettings?.dog && (
					<div className={styles.disableOverlay}>
						<div className={styles.diagnal}>
							<DynamicImage
								src={"/UI/misc/cross-line.webp"}
								alt=""
							/>
						</div>
					</div>
				)}
				<div className={styles.dogPawn}></div>
				<Droppable
					droppableId={getOwnedDroppableId("dog", "character")}
				>
					{(provided) => (
						<div
							className={styles.pawn}
							ref={provided.innerRef}
							{...provided.droppableProps}
							id={"dog-droppable"}
						>
							{dog.pawnService.freePawns.map((pawn, i) => {
								return (
									<Pawn
										pawn={pawn}
										context="character"
										index={i}
										key={pawn.draggableId}
										disabled={!difficultySettings?.dog}
									/>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<div className={`${styles.name}`}>
					{capitalize(t("character.dog"))}
				</div>
				<div className={styles.dogUsage}>
					<DynamicImage
						src={dogUsageImg}
						fill
						alt="umiejętności psa"
						sizes={styles.dogUsage}
					/>
				</div>
				<div className={`${styles.dogPic}`}>
					<DynamicImage
						src={dogPicImg}
						fill
						alt="pies"
						sizes={styles.picture}
					/>
				</div>
			</div>
		</div>
	);
}

// function mapStateToProps(state: RootState, ownProps: OwnProps) {
//   const dogPawns = state.freePawns.dog;
//   const fridayPawns = state.freePawns.friday;
//   return { dogPawns, fridayPawns, ...ownProps };
// }

export default React.memo(SideCharacters, objectsEqual);
