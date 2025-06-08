import {
  Icon,
  insertIconsIntoText,
} from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";
import { ImgListItem } from "../../ImgList.tsx/ImgListItem";
import { Trans, useTranslation } from "react-i18next";
import { ACTION } from "@shared/types/Game/ACTION";
import { Header } from "./Header/Header";
import { TransListItems } from "../../TransListItems/TransListItems";

export function HuntPage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.huntPage.section1";

  return (
    <>
      <Header action={ACTION.HUNT} />
      <section>
        <ul className={styles.list}>
          <TransListItems liAmount={4} baseTPath={`${tPath}.ul1`} />
        </ul>
        <div className={styles.flexBlock}>
          <div className={styles.card}>
            <DynamicImage
              src={"/UI/cards/beasts/tiger.webp"}
              alt="karta bestii"
            />
          </div>
          <div className={styles.exampleGif}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment-hunt.gif"}
              alt={"przydzielanie pionka"}
            />
          </div>
        </div>
        <ul className={styles.list}>
          <TransListItems
            liAmount={4}
            baseTPath={`${tPath}.ul2`}
            img={[
              "/UI/misc/black-skull.webp",
              "/UI/icons/weapon.webp",
              "/UI/icons/food.webp",
              "/UI/resources/leather.webp",
            ]}
            components={{ strong: <strong />, Icon: <Icon /> }}
          />
        </ul>
      </section>
    </>
  );
}
