import { Icon } from "../../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import DynamicImage from "../../../../../DynamicImage/DynamicImage";
import ActionOrder from "../../../ActionOrder/ActionOrder";
import guideStyles from "../../Guide.module.css";
import styles from "../../Guide.module.css";
import { Header } from "../Header/Header";
import { Trans, useTranslation } from "react-i18next";
import { TransListItems } from "../../TransListItems/TransListItems";

import successDice from "public/UI/dice/action/explore/success.webp";
import determinationDice from "public/UI/dice/action/explore/determination.webp";
import adventureDice from "public/UI/dice/action/explore/mystery.webp";
import hurtDice from "public/UI/dice/action/explore/hurt.webp";
import blankDice from "public/UI/dice/action/explore/blank.webp";
import { StaticImageData } from "next/image";

export function ActionResolvePage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.actionResolvePage";
  const tPathS2 = `${tPath}.section2`;

  return (
    <>
      <Header title={t(`${tPath}.title`)} />
      <section>
        <p className={guideStyles.p}>
          <Trans
            i18nKey={`${tPath}.section1.paragraph1`}
            components={{ Icon: <Icon /> }}
          />
        </p>
        <div className={styles.actionOrder}>
          <ActionOrder actionOrderContainerRef={undefined} />
        </div>
        {[2, 3].map((paragraph) => {
          return (
            <p className={guideStyles.p}>
              <Trans
                i18nKey={`${tPath}.section1.paragraph${paragraph}`}
                t={t}
                components={{ strong: <strong /> }}
              />
            </p>
          );
        })}
      </section>
      <section>
        <h2 className={guideStyles.subTitle}>{t(`${tPathS2}.title`)}</h2>
        <p className={guideStyles.p}>
          <Trans
            i18nKey={`${tPathS2}.paragraph1`}
            components={{ strong: <strong /> }}
          />
        </p>
        <ul className={guideStyles.list}>
          <TransListItems
            baseTPath={`${tPathS2}.ul1`}
            components={{ strong: <strong /> }}
            img={[
              successDice,
              determinationDice,
              adventureDice,
              hurtDice,
              blankDice,
            ].map((src: StaticImageData) => {
              return (
                <DynamicImage
                  src={src}
                  alt={t("other.dice")}
                  className={styles.dice}
                />
              );
            })}
          />
        </ul>
      </section>
    </>
  );
}
