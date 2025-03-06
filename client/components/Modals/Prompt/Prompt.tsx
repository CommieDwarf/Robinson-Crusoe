import capitalize from "@shared/utils/capitalize";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./EnterPassword.module.css";

type Input = string | boolean | number | undefined;

interface Props<T extends Input> {
	header?: string;
	message?: string;
	buttonText?: string;
	onChange?: (input: Input) => boolean;
	onClick?: (input: Input) => any;
	defaultValue?: Input;
}

export function Prompt<T extends Input>(props: Props<T>) {
	const [input, setInput] = useState(props.defaultValue);

	const { t } = useTranslation();

	function handleChange(event: React.FormEvent<HTMLInputElement>) {
		const { currentTarget } = event;
		setInput(currentTarget.value);
		if (props.onChange) {
			props.onChange(currentTarget.value);
		}
	}

	function handleClick() {
		props.onClick && props.onClick(input);
	}

	return (
		<div className={styles.container}>
			<h4>{props.header}</h4>
			<input
				type={"password"}
				value={input?.toString()}
				onChange={handleChange}
			/>
			<div className={"menuButton"} onClick={handleClick}>
				{capitalize(t(`menu.join`))}
			</div>
		</div>
	);
}
