import styles from "./Hunt.module.css";
import Image from "next/image";
import ActionSlot from "../ActionSlot";
import { ACTION } from "../../../../interfaces/ACTION";
import { ACTION_ITEM, getDroppableID } from "../../../../utils/getDroppableID";
import beastReverseImg from "/public/UI/cards/reverse/beast.png";

interface Props {
  zIndex: string;
  beastCount: number;
  isDragDisabled: boolean;
}

export default function Hunt(props: Props) {
  console.log(props.isDragDisabled, "DRAG DISABLED");
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
            action={ACTION.HUNT}
            actionItem={ACTION_ITEM.HUNT}
            id={getDroppableID(ACTION_ITEM.HUNT, "", "", 0)}
            isDragDisabled={props.isDragDisabled}
          />
          <ActionSlot
            type={"helper"}
            action={ACTION.HUNT}
            actionItem={ACTION_ITEM.HUNT}
            id={getDroppableID(ACTION_ITEM.HUNT, "", "", 1)}
            isDragDisabled={props.isDragDisabled}
          />
        </div>
      )}
    </div>
  );
}
