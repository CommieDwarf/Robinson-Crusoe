import { MainMenu } from "components/MainMenu/MainMenu";
import formStyles from "components/Form/Form.module.css";
import { FormInput } from "components/Form/FormInput/FormInput";
import { useState } from "react";
import { FormButton } from "components/Form/FormButton.tsx/FormButton";

export default function PasswordReset() {
	const [email, setEmail] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

    function handleSubmit() {
        
    }

	return (
		<MainMenu
			UserComponent={
				<div className={formStyles.container}>
					<form className={formStyles.form}>
						<h3>Resetowanie hasła</h3>
						<FormInput
							placeholder={"e-mail"}
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							error={error}
						/>
						<FormButton active={false} loading={false} label={""} />
					</form>
				</div>
			}
		/>
	);
}
