import {
  Icon,
  insertIconsIntoText,
} from "../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import Morale from "../../Morale/Morale";
import { insertIcon } from "../Guide";
import styles from "../Guide.module.css";
import { Trans, useTranslation } from "react-i18next";
import { Header } from "./Header/Header";
import { TransListItems } from "../TransListItems/TransListItems";

export function MoralePage() {
  const { t } = useTranslation();

  const tPathS1 = "guide.pages.moralePage.section1";
  const tPathS2 = "guide.pages.moralePage.section2";

  return (
    <>
      <Header
        title={t(`${tPathS1}.title`)}
        img={<DynamicImage src={"/UI/phase/morale.webp"} alt="event" />}
      />
      <section>
        {[1, 2].map((paragraph) => {
          return (
            <p className={styles.p}>
              <Trans
                i18nKey={`${tPathS1}.paragraph${paragraph}`}
                components={{ Icon: <Icon />, strong: <strong /> }}
                t={t}
              />
            </p>
          );
        })}
        <div className={styles.moraleBlock}>
          <Morale />
        </div>
        <ul className={styles.list}>
          <TransListItems
            baseTPath={`${tPathS1}.ul1`}
            liAmount={3}
            components={{ Icon: <Icon />, strong: <strong /> }}
          />
        </ul>
      </section>
      <section>
        <h2 className={styles.title}>{t(`${tPathS2}.title`)}</h2>
        <p className={styles.p}>{t(`${tPathS2}.paragraph1`)}</p>
        <ul className={styles.list}>
          <li>
            <Trans
              i18nKey={`${tPathS2}.li`}
              components={{ Icon: <Icon /> }}
              t={t}
            />
          </li>
        </ul>
        <p className={styles.p}>{t(`${tPathS2}.paragraph2`)}</p>
      </section>
    </>
  );
}
