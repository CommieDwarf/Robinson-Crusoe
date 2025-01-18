import Draggable from "react-draggable";
import { ChoiceObject } from "./Choice/Choice";
import styles from "./ChoiceSelector.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { insertIconsIntoText } from "../../../../utils/insertIconsIntoText/insertIconsIntoText";
import { useAppDispatch } from "../../../../store/hooks";
import { socketEmitAction } from "../../../../middleware/socketMiddleware";
import { useDynamicTranslation } from "../../../../utils/hooks/useDynamicTranslation";
import { ABILITY } from "@shared/types/Game/Skill/ABILITY";
import { IChoiceSelectorRenderData } from "@shared/types/Game/ChoiceSelector/ChoiceSelector";

interface Props {
	choiceSelector: IChoiceSelectorRenderData<any>;
}

export function ChoiceSelector(props: Props) {
	const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
	const { amount, objects, source, pickSubject, hasSecondEffect } =
		props.choiceSelector;

	const dispatch = useAppDispatch();

	function selectObject(id: string) {
		if (selectedObjectIds.length >= amount) {
			setSelectedObjectIds((prev) => [...prev.slice(0, -2), id]);
		} else {
			setSelectedObjectIds((prev) => [...prev, id]);
		}
	}

	function handleConfirmClick() {
		chooseObject(false);
	}

	function chooseObject(isSecondary: boolean) {
		if (selectedObjectIds.length === amount) {
			dispatch(
				socketEmitAction(
					OTHER_CONTROLLER_ACTION.PICK_OBJECT,
					props.choiceSelector.id,
					selectedObjectIds,
					isSecondary
				)
			);
		}
	}

	function handleSecondaryClick() {
		chooseObject(true);
	}

	const { t } = useTranslation();

	return (
		<Draggable bounds={"parent"}>
			<div className={styles.container}>
				<span className={styles.source}>
					<h1>
						{/*@ts-ignore*/}
						{capitalize(useDynamicTranslation(props.choiceSelector.source))}
					</h1>
					<h4>
						Wybierz { amount }
					</h4>
				</span>
				<span>
					
				</span>
				{Object.values(ABILITY).includes(
					props.choiceSelector.source as ABILITY
				) && (
					<div className={styles.descriptionWrapper}>
						<span className={styles.description}>
							{/* @ts-ignore */}
							{insertIconsIntoText(t(`ability.${props.choiceSelector.source}.description`),
								styles.icon
							)}
						</span>
					</div>
				)}

				{ 
					props.choiceSelector.pickSubject !== "construction" && (
						<div className={styles.pickObjects}>
							{objects.map((obj, index) => {
								return (
									<ChoiceObject
										pickSubject={pickSubject}
										pickObject={obj}
										key={index}
										selectObject={selectObject}
										selected={selectedObjectIds.includes(
											obj.id
										)}
										selectable={amount !== 0}
									/>
								);
							})}
						</div>
					)}


				<div className={styles.buttons}>
					<div
						className={`${styles.button} ${styles.buttonConfirm}`}
						onClick={handleConfirmClick}
					>
						{/* @ts-ignore*/}
						{insertIconsIntoText(
							capitalize(
								t(`pickObject.${source}.effectLabel`, {
									defaultValue: t(`other.confirm`),
								})
							),
							styles.icon
						)}
					</div>
					{hasSecondEffect && (
						<div
							className={`${styles.button} ${styles.buttonConfirm}`}
							onClick={handleSecondaryClick}
						>
							{ insertIconsIntoText(
                                //@ts-ignore
								capitalize(t(`pickObject.${source}.secondaryEffectLabel`)
								),
							)}
						</div>
					)}
				</div>
			</div>
		</Draggable>
	);
}
