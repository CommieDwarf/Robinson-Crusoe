import { kebabCase } from "lodash";
import DynamicImage from "../../../../DynamicImage/DynamicImage";
import styles from "../Guide.module.css";
import { ACTION } from "@shared/types/Game/ACTION";
import ActionSlot from "../../ActionSlot";
import { Trans, useTranslation } from "react-i18next";
import { Header } from "./Header/Header";
import { TransListItems } from "../TransListItems/TransListItems";

export function ActionPage() {
  const { t } = useTranslation();

  const tPath = "guide.pages.actionPage";
  const tPathS1 = `${tPath}.section1`;
  const tPathS2 = `${tPath}.section2`;
  const tPathS3 = `${tPath}.section3`;

  return (
    <>
      <Header
        title={t("phase.phase", { phase: "action" })}
        img={<DynamicImage src={"/UI/phase/action.webp"} alt="action" />}
      />
      <section>
        <p className={styles.p}>{t(`${tPathS1}.paragraph1`)}</p>
      </section>
      <section>
        <h3 className={styles.subTitle}></h3>
        {[1, 2, 3, 4].map((paragraphNum) => {
          return (
            <p className={styles.p}>
              {t(`${tPathS2}.paragraph${paragraphNum}`, {
                returnObjects: false,
              })}
            </p>
          );
        })}
        <ul className={styles.list}>
          {Object.values(ACTION).map((action, i) => {
            return (
              <li className={styles.li} key={i}>
                <div className={styles.listItemImg}>
                  <DynamicImage
                    src={`/UI/actions/${kebabCase(action)}.webp`}
                    alt={""}
                  />
                </div>
                <div className={styles.listItemDescription}>
                  <Trans i18nKey={`${tPathS2}.actionDescription.${action}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <p>{t(`${tPathS3}.paragraph1`)}</p>
        <div className={styles.flexBlock}>
          <div className={styles.pawnAssignmentImg}>
            <DynamicImage
              src={"/UI/guide/pawn-assignment.gif"}
              alt="przeciąganie pionka"
            />
          </div>
        </div>
        <ul className={styles.list}>
          <TransListItems
            baseTPath={tPathS3}
            img={["leader", "helper"].map((type) => {
              return (
                <ActionSlot
                  type={type as "leader" | "helper"}
                  action={ACTION.EXPLORE}
                  uniqueAction={ACTION.EXPLORE}
                  id={""}
                  static={true}
                />
              );
            })}
          />
        </ul>
      </section>
    </>
  );
}
