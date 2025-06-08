import { DraggableWindow } from "components/Game/UI/DraggableWindow/DraggableWindow";
import styles from "./UITourPrompt.module.css";
import { CheckBox } from "components/Checkbox/CheckBox";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import {
  tourInProgressUpdated,
  UITourRefusedUpdated,
} from "reduxSlices/UITour";
import { socketEmit } from "middleware/socketMiddleware";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { userPreferencesUpdated } from "reduxSlices/connection";
import { useTranslation } from "react-i18next";

export function UITourPrompt() {
  const [checked, setChecked] = useState(false);

  function handleCheckBoxClick() {
    setChecked((prev) => !prev);
  }

  const dispatch = useAppDispatch();

  function handleConfirmClick() {
    dispatch(tourInProgressUpdated(true));
  }

  function handleRefuseClick() {
    dispatch(UITourRefusedUpdated(true));
    if (checked) {
      dispatch(userPreferencesUpdated({ skipUITour: true }));
      dispatch(
        socketEmit(SOCKET_EVENT_CLIENT.CHANGE_USER_PREFERENCES, {
          preferences: {
            skipUITour: true,
          },
        }),
      );
    }
  }

  const { t } = useTranslation();

  return (
    <DraggableWindow
      styles={{ aspectRatio: 2.2, height: "30%" }}
      padding={"0 20px 0 20px"}
    >
      <div className={styles.content}>
        <p>{t("UITour.prompt.question")}</p>
        <div className={styles.buttons}>
          <div className={styles.button} onClick={handleRefuseClick}>
            {t("other.no")}
          </div>
          <div className={styles.button} onClick={handleConfirmClick}>
            {t("other.yes")}
          </div>
        </div>
        <div className={styles.dontAskAgain}>
          {t("UITour.prompt.dontAskAgain")}
          <CheckBox
            checked={checked}
            frameNumber={5}
            className={styles.checkBox}
            onClick={handleCheckBoxClick}
          />
        </div>
      </div>
    </DraggableWindow>
  );
}
