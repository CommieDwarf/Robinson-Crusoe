// @flow
import * as React from "react";
import styles from "./ContextMenu.module.css";
import { ITokenRenderData } from "@shared/types/Game/TokenService/Token";
import { capitalize } from "lodash";
import { StyledHr } from "components/StyledHr/StyledHr";

type Props = {
	left: number;
	mouseEnterMenu: () => void;
	mouseLeaveMenu: () => void;
	token: ITokenRenderData;
	utilizeToken: (id: string) => void;
};

const aspectRatio = 1.5;
const height = "25vh";

export const ContextMenu = (props: Props) => {
	const style = {
		left: `calc(${props.left}px - ${height} * ${aspectRatio} / 2)`,
	};

	function handleClick() {
		props.utilizeToken(props.token.id);
	}

	return (
		<div
			className={styles.container}
			style={style}
			onMouseLeave={props.mouseLeaveMenu}
			onMouseEnter={props.mouseEnterMenu}
		>
			<header className={styles.header}>
				{capitalize(props.token.namePL)}
			</header>
			<StyledHr color="border" style={{ width: "90%" }} />
			<div className={styles.description}>
				{capitalize(props.token.description)}
			</div>
			<div
				className={`${styles.useButton} ${styles.useButtonClickable}`}
				onClick={handleClick}
			>
				Użyj
			</div>
			<div className={styles.triangle}></div>
		</div>
	);
};
