import styles from "./Choice.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import { capitalize, kebabCase } from "lodash";
import { IInventionRenderData } from "@shared/types/Game/InventionService/Invention";
import { isPlayerCharacter } from "@shared/utils/typeGuards/isPlayerCharacter";
import { ICharacterRenderData } from "@shared/types/Game/Characters/Character";
import {
	ChoiceSubject,
	ChoosableObject,
	ChoosableRenderData,
} from "@shared/types/Game/ChoiceSelector/ChoiceSelector";
import { insertIconsIntoText } from "utils/insertIconsIntoText/insertIconsIntoText";
import { dynamicTranslate } from "utils/dynamicTranslate";

interface Props {
	pickSubject: ChoiceSubject;
	pickObject: ChoosableRenderData<ChoosableObject>;
	selectObject: (id: string) => void;
	selected: boolean;
	selectable: boolean;
}

export function ChoiceObject(props: Props) {
	const basePath = "/UI";
	let imgUrlPath = "";
	const name =
		"name" in props.pickObject.object
			? kebabCase(props.pickObject.object.name)
			: props.pickObject.object.id;

	switch (true) {
		case props.pickSubject === "beast":
			imgUrlPath = `${basePath}/cards/beasts/${name}.webp`;
			break;
		case props.pickSubject === "item":
			imgUrlPath = `${basePath}/cards/items/${name}.webp`;
			break;
		case props.pickSubject === "invention":
			imgUrlPath = `${basePath}/inventions/${(props.pickObject.object as IInventionRenderData).inventionType}/${name}.webp`;
			break;
		case props.pickSubject === "token":
			imgUrlPath = `${basePath}/tokens/discovery/${name}.webp`;
			break;
		case props.pickSubject === "tileType":
			imgUrlPath = `${basePath}/map/tiles/${name}.webp`;
			break;
		case props.pickSubject === "construction":
			imgUrlPath = `${basePath}/constructions/${name}-icon.webp`;
			break;
		case props.pickSubject === "character":
			const character = props.pickObject.object as ICharacterRenderData;
			imgUrlPath = isPlayerCharacter(character)
				? `${basePath}/characters/player-characters/${name}-${character.gender}.webp`
				: `${basePath}/characters/side-characters/${name}-pic.webp`;
			break;
	}

	function handleClick() {
		if (!props.selectable) {
			return;
		}
		props.selectObject(props.pickObject.id);
	}

	const aspectRatio =
		props.pickSubject === "token" ||
		props.pickSubject === "tileType" ||
		props.pickSubject === "character"
			? "square"
			: "card";

	return (
		<div
			className={`
            ${styles.container}
            ${props.selectable && styles.containerSelectable}
            ${props.selected && styles.containerSelected}
            ${styles[props.pickSubject]}
            ${styles[aspectRatio]}`}
			onClick={handleClick}
		>
			{props.pickSubject === "resource" ? (
				<div className={`${styles.resource}`}>
					{insertIconsIntoText(
						// @ts-ignore
						`${props.pickObject.object.amount!} $${
							// @ts-ignore
							props.pickObject.object.name!
						}$` ?? " "
					)}
				</div>
			) : (
				<>
					<div className={`${styles.imgWrapper}`}>
						<DynamicImage
							src={imgUrlPath}
							alt={String(name)}
							fill
						/>
					</div>
					<div className={`${styles.name}`}>
						{capitalize(
							dynamicTranslate(
								// @ts-ignore
								props.pickObject.object.name ??
									// @ts-ignore
									props.pickObject.object.id
							)
						)}
					</div>
				</>
			)}
		</div>
	);
}
