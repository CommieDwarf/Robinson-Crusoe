import styles from "./UserProfile.module.css";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import {
	SOCKET_EVENT_CLIENT,
	SOCKET_EVENT_SERVER,
} from "@shared/types/Requests/Socket";
import { socketEmit } from "../../middleware/socketMiddleware";
import { setSocketListener } from "../../pages/api/socket";
import { ProfileHome } from "./ProfileHome/ProfileHome";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";
import { UserData } from "@shared/types/UserData/UserData";


export enum PROFILE_NAV {
	HOME,
	SETTINGS,
}

export interface ProfileComponentProps {
	user: UserData | null;
	changeNav: (nav: PROFILE_NAV) => void;
}

export function UserProfile() {
	const router = useRouter();
	const user = useAppSelector((state) => state.connection.user);
	const dispatch = useAppDispatch();

	const [currentNav, setCurrentNav] = useState<PROFILE_NAV>(PROFILE_NAV.HOME);

	function changeNav(nav: PROFILE_NAV) {
		setCurrentNav(nav);
	}

	useEffect(() => {
		const listeners = [
			setSocketListener(
				SOCKET_EVENT_SERVER.JOIN_SESSION_RESPONSE,
				(payload) => {
					router.push("/play/" + payload.sessionId);
				}
			),
			setSocketListener(
				SOCKET_EVENT_SERVER.GAME_IN_PROGRESS_LIST_CHANGED,
				() => {
					requestGameList();
				}
			),
		];

		// requestGameList();
		return () => {
			listeners.forEach((listener) => listener.off());
		};
	}, [router]);

	function requestGameList() {
		dispatch(
			socketEmit(SOCKET_EVENT_CLIENT.SEND_GAME_IN_PROGRESS_LIST, null)
		);
	}

	return (
		<div className={styles.container}>
			{currentNav === PROFILE_NAV.HOME && (
				<ProfileHome user={user} changeNav={changeNav} />
			)}
			{currentNav === PROFILE_NAV.SETTINGS && (
				<ProfileSettings user={user} changeNav={changeNav} />
			)}
		</div>
	);
}
