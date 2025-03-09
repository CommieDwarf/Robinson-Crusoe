import styles from "./ControlPanel.module.css";
import { ReadyButton } from "../ReadyButton";
import { useEffect, useState } from "react";
import compassImg from "/public/UI/tokens/compass.webp";
import DynamicImage from "../../DynamicImage/DynamicImage";
import { SOCKET_EVENT_CLIENT } from "@shared/types/Requests/Socket";
import { BackButton } from "../../BackButton/BackButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { socketEmit } from "../../../middleware/socketMiddleware";

interface Props {
	ready: boolean;
	startEnabled: boolean;
}

export function ControlPanel(props: Props) {
	const [ready, setReady] = useState(props.ready);

	const dispatch = useAppDispatch();

	const isHost = useAppSelector(
		(state) =>
			state.gameSession.data?.hostPlayer.id ===
			state.gameSession.data?.localPlayer.id
	);

	const startAllowed = props.startEnabled && isHost;

	useEffect(() => {
		setReady(props.ready);
	}, [props.ready]);

	function toggleReady() {
		setReady((prev) => {
			dispatch(
				socketEmit(SOCKET_EVENT_CLIENT.SET_PLAYER_READY, {
					hydrateSessionId: true,
					value: !prev,
				})
			);
			return !prev;
		});
	}

	function handleStartClick() {
		if (startAllowed && props.ready) {
			dispatch(
				socketEmit(SOCKET_EVENT_CLIENT.START_GAME, {
					hydrateSessionId: true,
				})
			);
		}
	}

	return (
		<div className={styles.container}>
			<div className={`${styles.item} ${styles.backButton}`}>
				<BackButton url={"/multiplayer"} />
			</div>
			<div
				className={`${styles.item} ${styles.readiness} ${
					ready ? styles.ready : styles.notReady
				}`}
			>
				<ReadyButton
					ready={ready}
					disabled={false}
					onClick={toggleReady}
				/>
				<h4 className={`${styles.buttonText}`}>GOTOWY?</h4>
			</div>
			<div
				className={`${styles.item} ${
					!startAllowed ? styles.disabled : styles.startEnabled
				}`}
				onClick={handleStartClick}
			>
				<div className={`${styles.startButton}`}>
					<DynamicImage
						src={compassImg}
						alt={"start"}
						priority={true}
					/>
				</div>
				<h4 className={`${styles.buttonText}`}>START</h4>
			</div>
		</div>
	);
}
