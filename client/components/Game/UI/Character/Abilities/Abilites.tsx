import { useAppSelector } from "store/hooks";
import styles from "./Abilities.module.css";
import { IAbilityRenderData } from "@shared/types/Game/Skill/IAbility";
import { DisplayedAbilityInfo } from "../Character";
import { useEffect, useRef, useState } from "react";
import Ability from "./Ability/Ability";
import DropdownMenu from "components/DropDownMenu/DropDownMenu";
import AbilityPanel from "./AbilityPanel/AbilityPanel";

interface Props {
	abilities: IAbilityRenderData[];
    ownedDetermination: number;
}

export function Abilities(props: Props) {
	const [displayedAbilityInfo, setDisplayedAbilityInfo] =
		useState<DisplayedAbilityInfo>({
			ability: props.abilities[0],
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

	//     <SkillMenu
	//     abilityInfo={displayedAbilityInfo}
	//     used={
	//         character.abilities.find(
	//             (skill) =>
	//                 skill.name === displayedAbilityInfo.ability.name
	//         )?.usedInThisRound || false
	//     }
	//     width={containerWidth}
	//     ownedDetermination={character.determination}
	// />

	const abilityPanelRoot = document.getElementById("arrange-rest");

	const [abilityPanelWidth, setAbilityPanelWidth] = useState(0);

	useEffect(() => {
		if (!abilityPanelRoot) {
			return;
		}
		const observer = new ResizeObserver(() => {
			setAbilityPanelWidth(abilityPanelRoot?.offsetWidth);
		});
		observer.observe(abilityPanelRoot);

		return () => {
			observer.disconnect();
		};
	}, [abilityPanelRoot]);

	return (
		<div className={styles.container}>
			{props.abilities.map((ability, i) => {
				return (
					<Ability
						ability={ability}
						selectAbility={selectAbility}
						key={i}
						selected={
							ability === displayedAbilityInfo.ability &&
							displayedAbilityInfo.show
						}
					/>
				);
			})}

			{abilityPanelRoot && (
				<DropdownMenu
					isOpen={displayedAbilityInfo.show}
					size={{
						width: abilityPanelWidth + "px",
                        height: "auto"
					}}
					styles={{
						bottom: "0px",
					}}
					direction={"left"}
					root={abilityPanelRoot}
				>
					<AbilityPanel
						abilityInfo={displayedAbilityInfo}
						used={displayedAbilityInfo.ability.usedInThisRound}
						width={abilityPanelWidth}
						ownedDetermination={props.ownedDetermination}
					/>
				</DropdownMenu>
			)}
		</div>
	);
}
