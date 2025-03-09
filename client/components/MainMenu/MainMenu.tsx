import styles from "./MainMenu.module.css";
import DynamicImage from "../DynamicImage/DynamicImage";
import Link from "next/link";
import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRouter } from "next/router";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { socketEmit } from "../../middleware/socketMiddleware";
import { capitalizeAll } from "@shared/utils/capitalizeAll";
import { useTranslation } from "react-i18next";
import capitalize from "@shared/utils/capitalize";
import {
	gameSessionCleared,
} from "../../reduxSlices/gameSession";
import { setSocketListener } from "pages/api/socket";

interface Props {
	UserComponent: ReactElement;
}

export function MainMenu({ UserComponent }: Props) {
	const [isAnimated, setIsAnimated] = useState(false);
	const animationDurationMs = 200;


	const router = useRouter();
	const { t } = useTranslation();
	const socketConnected = useAppSelector(
		(state) => state.connection.socketConnected
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const listeners = [
			setSocketListener(
				SOCKET_EVENT_SERVER.GAME_SESSION_CREATED,
				(payload: { sessionId: string }) => {
					router.push("/play/" + payload.sessionId);
				}
			),
		];
		return () => {
			listeners.forEach((listener) => listener.off());
		};
	});

	function animateAuth(event: React.MouseEvent) {
		event.preventDefault();
		setIsAnimated(true);
		setTimeout(() => {
			setIsAnimated(false);
		}, animationDurationMs);
	}

	function handleQuickGameClick(event: React.MouseEvent) {
		if (!socketConnected) {
			animateAuth(event);
		}
		dispatch(gameSessionCleared());
		dispatch(socketEmit(SOCKET_EVENT_CLIENT.CREATE_QUICK_GAME, null));
	}

	function handleMultiPlayerClick(event: React.MouseEvent) {
		if (!socketConnected) {
			animateAuth(event);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<DynamicImage src={"/UI/title.webp"} alt={"title"} />
			</div>
			<div className={styles.menuWrapper}>
				<ul className={styles.menu}>
					<span onClick={handleQuickGameClick}>
						<li
							className={`${styles.menuItem} ${
								!socketConnected && styles.menuItemDisabled
							}`}
						>
							{capitalizeAll(t("menu.quick game"))}
						</li>
					</span>
					<Link
						href={"./multiplayer"}
						onClick={handleMultiPlayerClick}
					>
						<li
							className={`${styles.menuItem} ${styles.button2} ${
								!socketConnected && styles.menuItemDisabled
							}`}
						>
							{capitalizeAll(t("menu.multiplayer"))}
						</li>
					</Link>
					<Link href={"./settings"}>
						<li
							className={`${styles.menuItem} ${styles.button3} ${
								!socketConnected && styles.menuItemDisabled
							}`}
						>
							{capitalize(t("menu.settings"))}
						</li>
					</Link>
				</ul>
				<div className={styles.UserPanelContainer}>
					<div
						className={`${styles.userPanel} ${
							isAnimated && styles.pulsateOnce
						}`}
					>
						{UserComponent}
					</div>
				</div>
			</div>
		</div>
	);
}
