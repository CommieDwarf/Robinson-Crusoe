import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./Character.module.css";
import SideCharacters from "./SideCharacters/SideCharacters";
import SkillLabel from "./SkillLabel/SkillLabel";
import SkillMenu from "./SkillMenu/SkillMenu";
import { Wounds } from "@shared/types/Game/Characters/PlayerCharacter";
import { useAppSelector } from "../../../../store/hooks";
import Entries from "@shared/types/Entries";
import Wound from "./Wound/Wound";
import { getOwnedDroppableId } from "@shared/utils/getOwnedDroppableId";
import { IAbilityRenderData } from "@shared/types/Game/Skill/IAbility";
import ResizableImage from "../../../DynamicImage/DynamicImage";
import { capitalize, kebabCase } from "lodash";
import { useTranslation } from "react-i18next";
import { Expendables } from "./Expendables/Expendables";
import CharacterImg from "./CharacterImg/CharacterImg";
import Pawns from "./Pawns/Pawns";
import starImg from "/public/UI/icons/star.webp";

export interface DisplayedAbilityInfo {
	ability: IAbilityRenderData;
	show: boolean;
}

interface Props {
	zIndex: string;
}

export default function Character(props: Props) {
	const character = useAppSelector(
		(state) => state.gameSession.data?.localPlayer.character!
	);
	const [displayedAbilityInfo, setDisplayedAbilityInfo] =
		useState<DisplayedAbilityInfo>({
			ability: character.abilities[0],
			show: false,
		});

	function selectAbility(ability: IAbilityRenderData) {
		setDisplayedAbilityInfo((prev) => {
			return {
				ability,
				show: !(prev.ability === ability && prev.show),
			};
		});
	}

	const [containerWidth, setContainerWidth] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const { current } = containerRef;
		if (current) {
			setContainerWidth(current.clientWidth);
		}
	}, []);

	const skills = character.abilities.map((skill, i) => {
		return (
			<SkillLabel
				ability={skill}
				selectAbility={selectAbility}
				key={i}
				selected={
					skill === displayedAbilityInfo.ability &&
					displayedAbilityInfo.show
				}
			/>
		);
	});

	const zIndexClass = props.zIndex.includes("freepawns")
		? styles.zIndexIncreased
		: styles.zIndexTransition;

	const pawns = useAppSelector((state) => {
		return state.gameSession.data!.localPlayer.character?.pawnService
			.freePawns!;
	});

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

	const { t } = useTranslation();
	const charWrapperClass =
		styles[character.name + capitalize(character.gender) + "Img"];
	const droppableId = getOwnedDroppableId(character.name, "character");
	return (
		<div
			className={`${styles.container} ${zIndexClass} tour-character`}
			ref={containerRef}
		>
			<div
				className={`${styles.characterImg} ${charWrapperClass} tour-character-img`}
			>
				<CharacterImg character={character} />
			</div>
			<div className={styles.characterName}>
				{capitalize(t(`character.${character.name}`))}
				<div className={styles.primePlayerIcon}>
					<ResizableImage src={starImg} alt={"prime player"} />
				</div>
			</div>

			<SkillMenu
				abilityInfo={displayedAbilityInfo}
				used={
					character.abilities.find(
						(skill) =>
							skill.name === displayedAbilityInfo.ability.name
					)?.usedInThisRound || false
				}
				width={containerWidth}
				ownedDetermination={character.determination}
			/>
			<div className={`${styles.skills} tour-character-abilities`}>
				{skills}
			</div>
			<div className={styles.rightTop}>
				<Expendables
					determination={character.determination}
					weapon={character.weaponBoost}
					wood={character.hasPersonalResource.wood}
				/>
			</div>

			<div className={styles.pawns}>
				<Pawns
					character={character}
					pawns={pawns}
					dragDisabled={false}
					droppableId={droppableId}
				/>
			</div>
			<SideCharacters />
		</div>
	);
}
