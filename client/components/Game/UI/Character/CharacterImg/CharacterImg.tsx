import styles from "./CharacterImg.module.css";
import ResizableImage from "../../../../ResizableImage/ResizableImage";
import React from "react";
import Entries from "@shared/types/Entries";
import {
	IPlayerCharacterRenderData,
	Wounds,
} from "@shared/types/Game/Characters/PlayerCharacter";
import Wound from "../Wound/Wound";
import { kebabCase } from "lodash";

interface Props {
	character: IPlayerCharacterRenderData;
}

export default function CharacterImg({ character }: Props) {
	const wounds: JSX.Element[] = [];

	const woundEntries = Object.entries(character.wounds) as Entries<Wounds>;
	woundEntries.forEach(([bodyPart, actions], i) => {
		actions.forEach((action, j) => {
			wounds.push(
				<Wound
					character={character}
					bodyPart={bodyPart}
					action={action}
					count={j}
					key={i + j * 10}
				/>
			);
		});
	});

	const charImgName = kebabCase(`${character.name} ${character.gender}`);

	return (
		<div className={styles.container}>
			<div className={styles.characterPicture}>
				{wounds}
				<ResizableImage
					src={`/UI/characters/player-characters/${charImgName}.png`}
					fill
					alt="character"
					sizes={styles.characterPicture}
				/>
			</div>
		</div>
	);
}
