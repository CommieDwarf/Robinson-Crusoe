import styles from "./Hunt.module.css";
import Image from "next/image";
import ActionSlot from "../ActionSlot";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";
import { ACTION } from "../../../../interfaces/ACTION";
import { ACTION_ITEM, getDroppableID } from "../../../../utils/getDroppableID";
import beastReverseImg from "/public/UI/cards/reverse/beast.png";

interface Props {
  actionSlots: Map<string, IPawnRenderData | null>;
  zIndex: string;
  beastCount: number;
  isDragDisabled: boolean;
}

export default function Hunt(props: Props) {
  const leaderPawn = props.actionSlots.get("hunt-leader-0");
  const helperPawn = props.actionSlots.get("hunt-helper-1");

  const zIndexClass = props.zIndex.includes("hunt")
    ? styles.zIndexIncreased
    : "";
  const lockedClass = props.beastCount === 0;

  return (
    <div className={styles.container + " " + zIndexClass}>
      <div className={styles.card + " " + lockedClass}>
        <Image src={beastReverseImg} fill alt="Bestia" sizes={styles.card} />
      </div>
      <div className={styles.beastCount + " " + styles.locked}>
        {props.beastCount}
      </div>

      {props.beastCount > 0 && (
        <div className={styles.actionSlots}>
          <ActionSlot
            type={"leader"}
            pawn={leaderPawn}
            action={ACTION.HUNT}
            context={ACTION_ITEM.HUNT}
            id={getDroppableID(ACTION_ITEM.HUNT, "", "", 0)}
            isDragDisabled={props.isDragDisabled}
          />
          <ActionSlot
            type={"helper"}
            pawn={helperPawn}
            action={ACTION.HUNT}
            context={ACTION_ITEM.HUNT}
            id={getDroppableID(ACTION_ITEM.HUNT, "", "", 1)}
            isDragDisabled={props.isDragDisabled}
          />
        </div>
      )}
    </div>
  );
}
