// @flow
import * as React from "react";
import styles from "./LogMessage.module.css";
import { RoundSquare } from "../../Scenario/Scenarios/Castaways/Rounds/RoundSquare/RoundSquare";
import ResizableImage from "../../../../DynamicImage/DynamicImage";
import { ILogMessageRenderData } from "@shared/types/Game/ChatLog/LogMessage";
import { useTranslation } from "react-i18next";
import { insertIconsIntoText } from "../../../../../utils/insertIconsIntoText/insertIconsIntoText";
import capitalize from "@shared/utils/capitalize";
import { dynamicTranslate } from "../../../../../utils/dynamicTranslate";

type Props = {
	message: ILogMessageRenderData;
	first: boolean;
};

export const LogMessage = (props: Props) => {
	const { t } = useTranslation();
	const msg = props.message;
	const { content, source } = msg;
	const { code, subject1, subject2, amount } = content;

	const translatedContent = t(code, {
		subject1,
		subject2,
		amount,
		ns: "logMessages",
		defaultValue: code,
	});

	return (
		<div
			className={`${styles.container} ${
				props.first && styles.containerBorderless
			}`}
		>
			<div className={styles.roundSquareWrapper}>
				<RoundSquare
					round={msg.round}
					currentRound={true}
					ship={false}
					weather={{ rain: false, snow: false, hungryAnimal: false }}
					chatLog={true}
					dark={true}
				></RoundSquare>
			</div>

			<div className={styles.phaseIcon}>
				<ResizableImage
					src={"/UI/phase/" + msg.phase + ".webp"}
					alt={"faza"}
				/>
			</div>
			{}
			<div className={styles.messageContent}>
				<span className={styles.messageSource}>
					{insertIconsIntoText(
						capitalize(dynamicTranslate(source)),
						styles.icon
					)}{" "}
					-{" "}
				</span>
				<span className={styles.message + " " + styles[msg.color]}>
					{capitalize(translatedContent)}
				</span>
			</div>
		</div>
	);
};
