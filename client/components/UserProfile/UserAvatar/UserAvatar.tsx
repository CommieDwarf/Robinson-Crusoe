import { useEffect, useState } from "react";
import styles from "./UserAvatar.module.css";
import DynamicImage from "../../DynamicImage/DynamicImage";
import { useAppSelector } from "../../../store/hooks";
import config from "../../../config/config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
	username: string | "empty";
}

export function UserAvatar(props: Props) {
	const [avatarUrl, setAvatarUrl] = useState("");
	const localUserName = useAppSelector(
		(state) => state.connection.user?.username
	);
	const localAvatarSvg = useAppSelector(
		(state) => state.connection.user?.avatar
	);

	const { t } = useTranslation();

	useEffect(() => {
		if (props.username === "empty") {
			return;
		}
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

		fetchAvatar()
			.then((result) => {
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
			config.SERVER_URL + "/user/avatar/" + props.username,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const json = await result.json();

		if (!result.ok) {
			return;
		}

		if (result.status === 429) {
			toast(
				t("toast.request limit reached", { tryAfter: json.tryAfter })
			);
		} else {
			return json.svg;
		}
	}

	return (
		<div className={styles.container}>
			{avatarUrl && <DynamicImage src={avatarUrl} alt="avatar" />}
		</div>
	);
}
