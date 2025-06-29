import styles from "./ControlPanel.module.css";
import { NextPhaseButton } from "../NextPhaseButton/NextPhaseButton";
import React, { useRef } from "react";
import { PlayerReadiness } from "./PlayerReadiness/PlayerReadiness";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectGame } from "../../../../reduxSlices/gameSession";
import playersIconImg from "/public/UI/icons/players.webp";
import gearIconImg from "/public/UI/misc/gear.webp";
import bookIconImg from "/public/UI/misc/book.webp";
import exitIconImg from "/public/UI/icons/exit4.webp";
import DropdownMenu from "components/DropDownMenu/DropDownMenu";
import menuIconImg from "/public/UI/icons/menu.webp";
import { Button } from "./ViewPlayersButton/Button";
import { MenuItem } from "./Menu/MenuItem";
import { useRouter } from "next/router";
import { UIStateToggled, UIStateUpdated } from "reduxSlices/UITour";
import { useUITourControl } from "utils/hooks/useUITourControl";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";
import capitalize from "@shared/utils/capitalize";
import { useTranslation } from "react-i18next";

interface Props {
  phaseChangeLocked: boolean;
  confirmWindowIsOpen: boolean;
  togglePlayerOverviewOpen: () => void;
  toggleShowOptions: () => void;
  toggleShowGuide: () => void;
}

export function ControlPanel(props: Props) {
  const isPreAction = useAppSelector(
    (state) => selectGame(state)!.phaseService.phase! === "preAction",
  );

  function handleOptionsClick() {
    props.toggleShowOptions();
  }

  function handleGuideClick() {
    props.toggleShowGuide();
  }
  function handlePlayersClick() {
    props.togglePlayerOverviewOpen();
  }

  const router = useRouter();

  function handleMainMenuClick() {
    router.push("/");
  }

  const isMenuOpen = useAppSelector((state) => state.UITour.UiStates.menuOpen);

  const { delayInProgress, currentStep, handleNextStep } = useUITourControl();

  const dispatch = useAppDispatch();

  const stepIdsInMenu = [
    UI_TOUR_STEP_ID.MENU_GUIDE,
    UI_TOUR_STEP_ID.MENU_PLAYERS,
    UI_TOUR_STEP_ID.MENU_SETTINGS,
    UI_TOUR_STEP_ID.MENU_EXIT,
  ];

  function handleMenuButtonClick() {
    if (delayInProgress || stepIdsInMenu.includes(currentStep.data.id)) {
      return;
    }
    if (currentStep.data.id === UI_TOUR_STEP_ID.MENU) {
      handleNextStep();
    } else {
      dispatch(UIStateToggled("menuOpen"));
    }
  }

  const buttonRef = useRef<HTMLDivElement>(null);

  function handleOuterMenuClick(event: MouseEvent) {
    const current = buttonRef.current;
    if (
      !current ||
      delayInProgress ||
      stepIdsInMenu.includes(currentStep.data.id)
    ) {
      return;
    }
    if (
      currentStep.data.id === UI_TOUR_STEP_ID.MENU ||
      current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    dispatch(UIStateUpdated(["menuOpen", false]));
  }

  const moreThanOnePlayer = useAppSelector(
    (state) => state.gameSession.data!.players.length > 1,
  );

  const chatLog = document.getElementById("chatLog");

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={`${styles.dropDownButton} tour-menu`} ref={buttonRef}>
        <Button
          onClick={handleMenuButtonClick}
          imgSrc={menuIconImg}
          blackToBrownFilter={true}
          filter={isMenuOpen ? "var(--blackToWarmIvory)" : ""}
          style={isMenuOpen ? { backgroundColor: "var(--brown)" } : {}}
          scaleOnHover={true}
        />
      </div>
      {chatLog && (
        <DropdownMenu
          isOpen={isMenuOpen}
          size={{
            width: "auto",
            height: "30vh",
          }}
          direction={"top"}
          root={chatLog}
          styles={{
            left: 0,
            display: "flex",
            flexDirection: "column",
          }}
          delay={200}
          onOuterClick={handleOuterMenuClick}
        >
          <div className={styles.menu}>
            <MenuItem
              button={
                <Button imgSrc={playersIconImg} blackToBrownFilter={true} />
              }
              onClick={handlePlayersClick}
              label={capitalize(t("menu.players"))}
              className={"tour-menu-players"}
            />
            <MenuItem
              button={<Button imgSrc={gearIconImg} />}
              onClick={handleOptionsClick}
              label={capitalize(t("menu.settings"))}
              className={"tour-menu-options"}
            />
            <MenuItem
              button={<Button imgSrc={bookIconImg} />}
              onClick={handleGuideClick}
              label={capitalize(t("menu.guide"))}
              className={"tour-menu-guide"}
            />
            <MenuItem
              button={<Button imgSrc={exitIconImg} blackToBrownFilter={true} />}
              onClick={handleMainMenuClick}
              label={capitalize(t("menu.mainMenu"))}
              style={{ border: "none" }}
              className={"tour-menu-exit"}
            />
          </div>
        </DropdownMenu>
      )}

      {isPreAction && moreThanOnePlayer && <PlayerReadiness />}
      <NextPhaseButton
        locked={props.phaseChangeLocked || props.confirmWindowIsOpen}
        className={"tour-next-phase"}
      />
    </div>
  );
}
