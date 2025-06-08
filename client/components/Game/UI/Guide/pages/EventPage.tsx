import DynamicImage from "../../../../DynamicImage/DynamicImage";
import styles from "../Guide.module.css";
import { Trans, useTranslation } from "react-i18next";
import { capitalizeAll } from "@shared/utils/capitalizeAll";
import { Header } from "./Header/Header";
import { TransListItems } from "../TransListItems/TransListItems";

export function EventPage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.eventPage";

  return (
    <>
      <section>
        <Header
          title={t("phase.phase", { phase: "event" })}
          img={<DynamicImage src={"/UI/phase/event.webp"} alt="event" />}
        />
        <p className={styles.p}>{t(`${tPath}.paragraph1`)}</p>
      </section>
      <section>
        <div className={styles.flexBlock}>
          <div className={styles.cardExampleImg}>
            <DynamicImage
              src="/UI/guide/event/event-card-example.webp"
              alt="event card example"
            />
          </div>
          <div className={styles.cardExampleImg2}>
            <DynamicImage src={"/UI/guide/event/threat.webp"} alt="event" />
          </div>
        </div>
        <ul className={styles.list}>
          <TransListItems
            baseTPath={tPath}
            img={[
              "/UI/tokens/adventure/explore.webp",
              "/UI/scenarios/book.webp",
            ]}
            liAmount={5}
          />
        </ul>
      </section>
      <section>
        <p className={styles.p}>{t(`${tPath}.paragraph2`)}</p>
      </section>
    </>
  );
}
