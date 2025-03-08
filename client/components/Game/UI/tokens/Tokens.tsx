import React, { useRef, useState } from "react";
import styles from "./Tokens.module.css";

import Token from "./Token/Token";
import { ContextMenu } from "./ContextMenu/ContextMenu";
import { ITokenRenderData } from "@shared/types/Game/TokenService/Token";
import { getObjectsComparator } from "../../../../utils/getObjectsComparator";
import { OTHER_CONTROLLER_ACTION } from "@shared/types/CONTROLLER_ACTION";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectTokenService } from "../../../../reduxSlices/gameSession";
import { socketEmitAction } from "../../../../middleware/socketMiddleware";

interface Props {
	menuDisabled: boolean;
}

function Tokens(props: Props) {
	const [mouseOverToken, setMouseOverToken] = useState(false);
	const [mouseOverMenu, setMouseOverMenu] = useState(false);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [selectedToken, setSelectedToken] = useState<null | ITokenRenderData>(
		null
	);
	const [contextMenuLeft, setContextMenuLeft] = useState(0);
	const [tokenLocked, setTokenLocked] = useState(false);

	const dispatch = useAppDispatch();

	const { owned = undefined, future = undefined } =
		useAppSelector((state) => selectTokenService(state)) || {};

	function handleScroll(event: React.UIEvent<HTMLDivElement>) {
		setScrollLeft(event.currentTarget.scrollLeft);
	}

	const scrollRef = useRef<HTMLDivElement>(null);

	function handleWheel(event: React.WheelEvent) {
		event.preventDefault();
		if (!scrollRef.current) {
			return;
		}
		const containerScrollPosition = scrollRef.current.scrollLeft;
		scrollRef.current.scrollTo({
			top: 0,
			left: containerScrollPosition + event.deltaY,
			behavior: "smooth",
		});
	}

	function mouseEnterToken(
		token: ITokenRenderData,
		menuLeft: number,
		locked: boolean
	) {
		setSelectedToken(token);
		setMouseOverToken(true);
		setContextMenuLeft(menuLeft);
		setTokenLocked(locked);
	}

	function mouseLeaveToken() {
		setMouseOverToken(false);
	}

	function mouseEnterMenu() {
		setMouseOverMenu(true);
	}

	function mouseLeaveMenu() {
		setMouseOverMenu(false);
	}

	function utilizeToken(id: string) {
		if (tokenLocked) {
			return;
		}
		setSelectedToken(null);
		dispatch(
			socketEmitAction(
				OTHER_CONTROLLER_ACTION.USE_DISCOVERY_TOKEN,
				id,
				"cook"
			)
		);
	}

	return (
		<div className={`${styles.container} tour-discovery-tokens`}>
			{(mouseOverToken || mouseOverMenu) &&
				selectedToken &&
				!props.menuDisabled && (
					<ContextMenu
						left={contextMenuLeft - scrollLeft}
						mouseEnterMenu={mouseEnterMenu}
						mouseLeaveMenu={mouseLeaveMenu}
						token={selectedToken}
						utilizeToken={utilizeToken}
					/>
				)}
			<div
				className={styles.scroll}
				onScroll={handleScroll}
				onWheel={handleWheel}
				ref={scrollRef}
			>
				<div className={styles.content}>
					{owned &&
						owned.map((token, i) => {
							return (
								<Token
									key={i}
									token={token}
									mouseEnterToken={mouseEnterToken}
									mouseLeaveToken={mouseLeaveToken}
									locked={false}
								/>
							);
						})}
					{future &&
						future.map((token, i) => {
							return (
								<Token
									key={i}
									token={token}
									mouseEnterToken={mouseEnterToken}
									mouseLeaveToken={mouseLeaveToken}
									locked={true}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default React.memo(Tokens, getObjectsComparator());
