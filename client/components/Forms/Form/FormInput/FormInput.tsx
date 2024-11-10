import { InputHTMLAttributes } from "react";
import styles from "./FormInput.module.css";
import formStyles from "../Form.module.css";
import { FormError } from "../FormError/FormError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string | "";
	className?: string;
}

export function FormInput(props: Props) {
	return (
		<div className={`${formStyles.rowWrapper} ${props.className}`}>
			<div className={styles.inputWrapper}>
			<input {...props} className={styles.input}/>
			</div>
            {props.error !== undefined && <FormError error={props.error}/>}
		</div>
	);
}
