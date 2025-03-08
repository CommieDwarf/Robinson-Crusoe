import { MysteryCardCounter } from "./MysteryCardCounter/MysteryCardCounter";
import * as React from "react";
import { MYSTERY_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { CardResolveButtonProp } from "../CardResolve/CardResolve";
import { MysteryCardResolve } from "../CardResolve/Mystery/MysteryCardResolve";
import styles from "./MysteryCardDraw.module.css";
import { ResolveButtons } from "../CardResolve/ResolveButtons/ResolveButtons";
import Draggable from "react-draggable";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
	selectGame,
	selectPlayerByCharacter,
} from "../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../middleware/socketMiddleware";

export function MysteryCardDraw() {
	const mysteryService = useAppSelector(
		(state) => selectGame(state)?.mysteryService
	);
	const mysteryCard = mysteryService?.currentResolve;

	const dispatch = useAppDispatch();

	const button1: CardResolveButtonProp = {
		label: (mysteryCard?.drawResolved && mysteryCard?.drawLabel) || "draw",
		triggerEffect: drawOrTriggerEffect,
		locked: !mysteryService?.canDraw,
	};

	const button2: CardResolveButtonProp = {
		label: "finish",
		triggerEffect: finish,
		locked: !mysteryService?.canFinish,
	};

	function drawOrTriggerEffect() {
		if (mysteryService?.currentResolve?.drawResolved === false) {
			dispatch(
				socketEmitAction(
					MYSTERY_CONTROLLER_ACTION.TRIGGER_MYSTERY_DRAW_EFFECT
				)
			);
		} else if (mysteryService?.canDraw) {
			dispatch(
				socketEmitAction(MYSTERY_CONTROLLER_ACTION.DRAW_MYSTERY_CARD)
			);
		}
	}

	function finish() {
		if (mysteryService?.canFinish) {
			dispatch(
				socketEmitAction(
					MYSTERY_CONTROLLER_ACTION.FINISH_DRAWING_MYSTERY_CARDS
				)
			);
		}
	}


	const character = mysteryService?.drawer?.name;

	const player = useAppSelector(
		(state) => character && selectPlayerByCharacter(state, character)
	);

	if (!mysteryService) return null;
	return (
		<Draggable bounds={"parent"}>
			<div
				className={`${styles.container}`}
			>
				<div className={styles.card}>
					<MysteryCardResolve card={mysteryService.currentResolve} />
				</div>
				<ResolveButtons
					button1={button1}
					button2={button2}
					color={player && player.color}
				/>
				<MysteryCardCounter cardsLeft={mysteryService.cardsLeft} />
			</div>
		</Draggable>
	);
}
