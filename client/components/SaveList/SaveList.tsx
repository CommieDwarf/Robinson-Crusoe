import { SaveOverview as ISaveOverview } from "@shared/types/SaveGame";
import styles from "./SaveList.module.css";
import { SaveOverview } from "./SaveOverview/SaveOverview";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { socketEmit } from "../../middleware/socketMiddleware";
import {
  SOCKET_EVENT_CLIENT,
  SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { setSocketListener } from "../../pages/api/socket";
import { sessionIdUpdated } from "../../reduxSlices/gameSession";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { capitalizeAll } from "@shared/utils/capitalizeAll";
import capitalize from "@shared/utils/capitalize";

export function SaveList() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedSaveId, setSelectedSaveId] = useState<null | string>(null);
  const [saveList, setSaveList] = useState<ISaveOverview[]>([]);

  useEffect(() => {
    const listeners = [
      setSocketListener(SOCKET_EVENT_SERVER.GAME_SESSION_CREATED, (payload) => {
        dispatch(sessionIdUpdated(payload.sessionId));
        router.push(`multiplayer/lobby/${payload.sessionId}`).then();
      }),
      setSocketListener(SOCKET_EVENT_SERVER.SAVE_LIST_SENT, (payload) => {
        setSaveList(payload.list);
      }),
    ];

    dispatch(socketEmit(SOCKET_EVENT_CLIENT.SEND_SAVE_LIST, {}));

    return () => {
      listeners.forEach((listener) => listener.off());
    };
  }, [dispatch, router]);

  function selectSave(id: string) {
    setSelectedSaveId(id);
  }

  function handleLoadClick() {
    if (selectedSaveId) {
      dispatch(
        socketEmit(SOCKET_EVENT_CLIENT.LOAD_SAVE, {
          saveId: selectedSaveId,
        }),
      );
    }
  }

  function handleDeleteClick() {
    if (selectedSaveId) {
      dispatch(
        socketEmit(SOCKET_EVENT_CLIENT.DELETE_SAVE, {
          saveId: selectedSaveId,
        }),
      );
    }
  }

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h4>{capitalizeAll(t("gameSettings.savedGames"))}</h4>
      <div className={styles.list}>
        {saveList.map((save, i) => {
          return (
            <SaveOverview
              save={save}
              index={i + 1}
              onClick={selectSave}
              key={i}
              selected={save.id === selectedSaveId}
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <div
          className={`${styles.button} menuButton`}
          onClick={handleLoadClick}
        >
          {capitalize(t("gameSettings.load"))}
        </div>
        <div
          className={`${styles.button} menuButton ${styles.buttonDelete}`}
          onClick={handleDeleteClick}
        >
          {capitalize(t("gameSettings.delete"))}
        </div>
      </div>
    </div>
  );
}
