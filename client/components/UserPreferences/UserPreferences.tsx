import { CheckBox } from "components/Checkbox/CheckBox";
import styles from "./UserPreferences.module.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  selectUserPreferences,
  userPreferencesUpdated,
} from "reduxSlices/connection";
import { UserPreferencesData } from "@shared/types/UserData/UserData";
import { socketEmit } from "middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { UITourInitialStateSet } from "reduxSlices/UITour";
import { useTranslation } from "react-i18next";

export function UserPreferences() {
  const preferences = useAppSelector((state) => selectUserPreferences(state));
  const dispatch = useAppDispatch();

  function handleSkipUIClick() {
    if (!preferences) {
      return;
    }
    handlePreferencesChange({ skipUITour: !preferences.skipUITour });
    dispatch(UITourInitialStateSet());
  }

  function handlePreferencesChange(preferences: Partial<UserPreferencesData>) {
    dispatch(userPreferencesUpdated(preferences));
    dispatch(
      socketEmit(SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES, {
        preferences,
      }),
    );
  }

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={`${styles.prefference} ${styles.skipUITour}`}>
          <CheckBox
            className={styles.checkBox}
            checked={!preferences?.skipUITour}
            onClick={handleSkipUIClick}
          />{" "}
          {t("generalSettings.UIGuide")}
        </div>
      </div>
    </div>
  );
}
