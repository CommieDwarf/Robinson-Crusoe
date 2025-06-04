import styles from "./LangSwitch.module.css";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { useTranslation } from "react-i18next";

export function LangSwitch() {
  const { i18n } = useTranslation();

  async function handleOn() {
    await i18n.changeLanguage("pl");
  }

  async function handleOff() {
    await i18n.changeLanguage("en");
  }

  return (
    <div className={styles.container}>
      <label className={styles.englishLabel}>EN</label>
      <div className={styles.switch}>
        <ToggleSwitch
          onOff={handleOff}
          onOn={handleOn}
          sliderOnClass={styles.toggleSwitchPolish}
          sliderOffClass={styles.toggleSwitchEnglish}
        />
      </div>
      <label className={styles.polishLabel}>PL</label>
    </div>
  );
}
