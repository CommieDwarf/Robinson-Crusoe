import styles from "./Hunt.module.css";
import Image from "next/image";
import ActionSlot from "../ActionSlot";
import { IPawnRenderData } from "../../../../interfaces/Pawns/Pawn";

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
        <Image
          src={"/interface/cards/reverse/beast.png"}
          layout={"fill"}
          alt="Bestia"
        />
      </div>
      <div className={styles.beastCount + " " + styles.locked}>
        {props.beastCount}
      </div>

      {props.beastCount > 0 && (
        <div className={styles.actionSlots}>
          <ActionSlot
            type={"leader"}
            pawn={leaderPawn}
            action={"hunt"}
            context={"hunt"}
            id={"hunt-leader-0"}
            isDragDisabled={props.isDragDisabled}
          />
          <ActionSlot
            type={"helper"}
            pawn={helperPawn}
            action={"hunt"}
            context={"hunt"}
            id={"hunt-helper-1"}
            isDragDisabled={props.isDragDisabled}
          />
        </div>
      )}
    </div>
  );
}
