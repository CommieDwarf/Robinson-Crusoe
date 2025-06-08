import DynamicImage from "components/DynamicImage/DynamicImage";
import styles from "./index.module.css";
import shipImage from "public/UI/404.webp";
import { RedirectLink } from "components/Forms/Form/RedirectLink/RedirectLink";
import { useTranslation } from "react-i18next";

export default function Custom404() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("other.pageNotFound")}</h1>
      <div className={styles.shipImg}>
        <DynamicImage src={shipImage} alt="404" />
      </div>
      <div className={styles.backLink}>
        <RedirectLink linkText={t("other.backToHomePage")} href={"/"} />
      </div>
    </div>
  );
}
