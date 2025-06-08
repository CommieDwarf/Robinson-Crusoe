import { BackButton } from "components/BackButton/BackButton";
import styles from "./index.module.css";
import { StyledHr } from "components/StyledHr/StyledHr";
import { UserPreferences } from "components/UserPreferences/UserPreferences";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <div className={styles.title}>
          <h1>{t("generalSettings.title")}</h1>
        </div>
      </div>
      <div className={styles.spacer}></div>
      <StyledHr color="border" />
      <div className={styles.spacer}></div>

      <UserPreferences />
    </div>
  );
}
