import styles from "./Pawns.module.css";
import Pawn from "../../Pawn";
import { Droppable } from "react-beautiful-dnd";
import React from "react";
import { ICharacterRenderData } from "@shared/types/Game/Characters/Character";
import { IPawnRenderData } from "@shared/types/Game/Pawns/Pawn";

interface Props {
	character: ICharacterRenderData;
	pawns: IPawnRenderData<any>[];
	dragDisabled: boolean;
	droppableId: string;
}

export default function Pawns(props: Props) {
	const pawns = props.pawns.map((pawn, i) => {
		return (
			<Pawn
				pawn={pawn}
				context={"character"}
				index={i}
				key={pawn.draggableId}
				disabled={props.dragDisabled}
			/>
		);
	});

	return (
		<div className={`${styles.container} tour-character-pawns`}>
			{props.dragDisabled ? (
				<div className={styles.content} id={props.droppableId}>
					{pawns}
				</div>
			) : (
				<Droppable
					droppableId={props.droppableId}
					isDropDisabled={props.dragDisabled}
				>
					{(provided) => (
						<div
							id={props.droppableId}
							className={styles.content}
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{pawns}

							{provided.placeholder}
						</div>
					)}
				</Droppable>
			)}
		</div>
	);
}
