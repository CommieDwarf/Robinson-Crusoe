import styles from "../../../Guide.module.css";
import DynamicImage from "../../../../../../DynamicImage/DynamicImage";
import { useTranslation } from "react-i18next";
import { ACTION } from "@shared/types/Game/ACTION";
import { kebabCase } from "lodash";
import { Header as PageHeader } from "../../Header/Header";

interface Props {
  action: ACTION;
}

export function Header(props: Props) {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t("phase.phase", { phase: "action" })}
        img={<DynamicImage src={"/UI/phase/action.webp"} alt="action" />}
      />
      <div className={styles.flexBlock}>
        <div className={styles.titleImg}>
          <DynamicImage
            src={`/UI/actions/${kebabCase(props.action)}.webp`}
            alt="action"
          />
        </div>
        <h2 className={styles.subTitle}>
          {t("action.action", { action: props.action })}
        </h2>
        <div className={styles.titleImg}>
          <DynamicImage
            src={`/UI/actions/${kebabCase(props.action)}.webp`}
            alt="action"
          />
        </div>
      </div>
    </>
  );
}
