import { useEffect, useState } from "react";
import styles from "./UserAvatar.module.css";
import ResizableImage from "../../ResizableImage/ResizableImage";
import { useAppSelector } from "../../../store/hooks";
import config from "../../../config";

interface Props {
	username: string;
}

export function UserAvatar(props: Props) {
	const [avatarUrl, setAvatarUrl] = useState("");
	const localUserName = useAppSelector(
		(state) => state.connection.user?.username
	);
	const localAvatarSvg = useAppSelector(
		(state) => state.connection.user?.avatar
	);

	useEffect(() => {
		const storageSvg = localStorage.getItem(
			getStorageKeyName(props.username)
		);

		if (storageSvg) {
			setAvatarUrl(svgToUrl(storageSvg));
			return;
		}
		if (localUserName === props.username && localAvatarSvg) {
			setAvatarUrl(svgToUrl(localAvatarSvg));
			return;
		}

		fetchAvatar().then((result) => {
			setAvatarUrl(svgToUrl(result));
			localStorage.setItem(getStorageKeyName(props.username), result);
		});
	}, [props.username, localAvatarSvg, localUserName]);

	function svgToUrl(svg: string) {
		const blob = new Blob([svg], { type: "image/svg+xml" });
		return URL.createObjectURL(blob);
	}

	function getStorageKeyName(username: string) {
		return username + "Avatar";
	}

	async function fetchAvatar() {
		const result = await fetch(
			config.SERVER_URL + "/getUserAvatar/" + props.username,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (result.ok) {
			return await result.json().then((val) => val.svg);
		}
	}

	return (
		<div className={styles.container}>
			{avatarUrl && <ResizableImage src={avatarUrl} alt="avatar" />}
		</div>
	);
}
