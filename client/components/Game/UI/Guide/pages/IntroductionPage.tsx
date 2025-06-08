import { PHASE } from "@shared/types/Game/PhaseService/Phase";
import styles from "../Guide.module.css";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import capitalize from "@shared/utils/capitalize";
import { useTranslation } from "react-i18next";

export function IntroductionPage() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <section>
        <h2 className={styles.title}>
          {t("guide.pages.introduction.gameObjective.title")}
        </h2>
        <p className={styles.p}>
          {t("guide.pages.introduction.gameObjective.paragraph")}
        </p>
      </section>
      <section>
        <h2 className={styles.title}>
          {t("guide.pages.introduction.roundProgression.title")}
        </h2>
        <p className={styles.p}>
          {t("guide.pages.introduction.roundProgression.paragraph")}
        </p>
        <ul className={styles.list}>
          {Object.values(PHASE).map((phase, i) => {
            return (
              <li key={phase} className={styles.li}>
                <div className={styles.listItemImg}>
                  <DynamicImage
                    src={"/UI/phase/" + phase + ".webp"}
                    alt={phase}
                  />
                </div>
                <span className={styles.listItemDescription}>
                  {i + 1}.{" "}
                  <strong>
                    {capitalize(
                      t("phase." + phase, {
                        context: "genitive",
                      }),
                    )}{" "}
                    -{" "}
                  </strong>
                  {t(`guide.pages.introduction.phaseDescription.${phase}`)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
