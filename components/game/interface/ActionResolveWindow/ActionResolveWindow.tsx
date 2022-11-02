import * as React from "react";
import styles from "./ActionResolveWindow.module.css";
import Image from "next/image";
import { ActionResolve } from "./ActionResolve/ActionResolve";
import { IThreatRenderData } from "../../../../interfaces/Threat/Threat";
import { IBeastRenderData } from "../../../../interfaces/Beasts/Beast";
import { IInventionRenderData } from "../../../../interfaces/Inventions/Invention";
import { IStructureRenderData } from "../../../../interfaces/Structures/Structure";
import { ITilesServiceRenderData } from "../../../../interfaces/Tiles/TilesService";
import { IBeastsRenderData } from "../../../../interfaces/Beasts/Beasts";
import {
  IInventionsService,
  IInventionsServiceRenderData,
} from "../../../../interfaces/Inventions/Inventions";
import { IStructuresServiceRenderData } from "../../../../interfaces/Structures/Structures";
import { Action } from "../../../../interfaces/Action";

type Props = {
  threat: IThreatRenderData;
  beast: IBeastsRenderData;
  inventions: IInventionsServiceRenderData;
  structures: IStructuresServiceRenderData;
  tiles: ITilesServiceRenderData;
  currentAction: Action;
};
export const ActionResolveWindow = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.actionIcon}>
          <Image src={"/interface/phase/action.png"} layout={"fill"} />
        </div>
        <div className={styles.title}>Faza Akcji</div>
        <div className={styles.actionIcon}>
          <Image src={"/interface/phase/action.png"} layout={"fill"} />
        </div>
      </div>
      <ActionResolve />
    </div>
  );
};
