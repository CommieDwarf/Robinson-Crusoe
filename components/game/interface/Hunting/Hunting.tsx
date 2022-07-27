import styles from "./Hunting.module.css";
import Image from "next/image";
import ActionSlot from "../ActionSlot";
import Pawn from "../../../../interfaces/Pawn";
import Beast from "../../../../interfaces/Beast";

interface Props {
  actionSlots: Map<string, Pawn | null>;
  zIndexIncreased: boolean;
  beastDeck: Beast[];
  isDragDisabled: boolean;
}

export default function Hunting(props: Props) {
  const leaderPawn = props.actionSlots.get("hunt-leader");
  const helperPawn = props.actionSlots.get("hunt-helper");

  const zIndexClass = props.zIndexIncreased ? styles.zIndexIncreased : "";
  const lockedClass = props.beastDeck.length === 0 ? styles.locked : "";

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
        {props.beastDeck.length}
      </div>

      {props.beastDeck.length > 0 && (
        <div className={styles.actionSlots}>
          <ActionSlot
            type={"leader"}
            pawn={leaderPawn}
            action={"hunt"}
            context={"hunt"}
            id={"hunt-leader"}
            isDragDisabled={props.isDragDisabled}
          />
          <ActionSlot
            type={"helper"}
            pawn={helperPawn}
            action={"hunt"}
            context={"hunt"}
            id={"hunt-helper"}
            isDragDisabled={props.isDragDisabled}
          />
        </div>
      )}
    </div>
  );
}
