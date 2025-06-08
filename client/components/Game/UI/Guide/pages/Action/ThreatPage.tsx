import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import styles from "../../Guide.module.css";
import { useTranslation } from "react-i18next";
import { Header } from "./Header/Header";
import { ACTION } from "@shared/types/Game/ACTION";
import { TransListItems } from "../../TransListItems/TransListItems";

export function ThreatPage() {
  const tPath = "guide.pages.threatPage.section1";

  const { t } = useTranslation();

  return (
    <>
      <Header action={ACTION.THREAT} />
      <section>
        <div className={styles.flexBlock}>
          <div className={styles.cardExampleImg}>
            <DynamicImage
              src="/UI/guide/event/event-card-example.webp"
              alt="event card example"
            />
          </div>
          <div
            className={styles.cardExampleImg2}
            style={{ aspectRatio: 339 / 265 }}
          >
            <DynamicImage
              src="/UI/guide/pawn-assignment-threat.gif"
              alt="przydzielanie pionka"
            />
          </div>
        </div>
        <ul className={styles.list}>
          <TransListItems liAmount={3} baseTPath={`${tPath}.ul1`} />
        </ul>
        <p className={styles.p}>{t(`${tPath}.paragraph1`)}</p>
        <ul className={styles.list}>
          <TransListItems
            liAmount={4}
            baseTPath={`${tPath}.ul2`}
            img={[
              "/UI/characters/pawns/helper.webp",
              "/UI/icons/weapon.webp",
              "/UI/icons/wood.webp",
              "/UI/icons/shovel.webp",
            ]}
          />
        </ul>
      </section>
    </>
  );
}
