import styles from "./ControlPanel.module.css";
import { NextPhaseButton } from "../NextPhaseButton/NextPhaseButton";
import React from "react";
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
import { UIStateToggled } from "reduxSlices/UITour";
import { useUITourControl } from "utils/hooks/useUITourControl";
import { UI_TOUR_STEP_ID } from "types/UITour/UI_TOUR_STEP_ID";

interface Props {
	phaseChangeLocked: boolean;
	confirmWindowIsOpen: boolean;
	togglePlayerOverviewOpen: () => void;
	toggleShowOptions: () => void;
	toggleShowGuide: () => void;
}

export function ControlPanel(props: Props) {
	const isPreAction = useAppSelector(
		(state) => selectGame(state)!.phaseService.phase! === "preAction"
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

	const isMenuOpen = useAppSelector(
		(state) => state.UITour.UiStates.menuOpen
	);

	const { delayInProgress, currentStep, handleNextStep } = useUITourControl();

	const dispatch = useAppDispatch();

	const stepIdsInMenu = [
		UI_TOUR_STEP_ID.MENU_GUIDE,
		UI_TOUR_STEP_ID.MENU_PLAYERS,
		UI_TOUR_STEP_ID.MENU_SETTINGS,
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

	const moreThanOnePlayer = useAppSelector((state) => state.gameSession.data!.players.length > 1);

	const chatLog = document.getElementById("chatLog");

	return (
		<div className={styles.container}>
			<div className={`${styles.dropDownButton} tour-menu`}>
				<Button
					onClick={handleMenuButtonClick}
					imgSrc={menuIconImg}
					blackToBrownFilter={true}
					filter={isMenuOpen ? "var(--blackToWarmIvory)" : ""}
					style={
						isMenuOpen ? { backgroundColor: "var(--brown)" } : {}
					}
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
				>
					<div className={styles.menu}>
						<MenuItem
							button={
								<Button
									imgSrc={playersIconImg}
									blackToBrownFilter={true}
								/>
							}
							onClick={handlePlayersClick}
							label={"Gracze"}
							className={"tour-menu-players"}
						/>
						<MenuItem
							button={<Button imgSrc={gearIconImg} />}
							onClick={handleOptionsClick}
							label={"Ustawienia"}
							className={"tour-menu-options"}
						/>
						<MenuItem
							button={<Button imgSrc={bookIconImg} />}
							onClick={handleGuideClick}
							label={"Poradnik"}
							className={"tour-menu-guide"}
						/>
						<MenuItem
							button={
								<Button
									imgSrc={exitIconImg}
									blackToBrownFilter={true}
								/>
							}
							onClick={handleMainMenuClick}
							label={"Menu główne"}
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
