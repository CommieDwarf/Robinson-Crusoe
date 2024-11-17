import React, { FormEvent, useEffect, useState } from "react";
import config from "../../../config/config";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../../utils/auth/isAuthenticated";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchAndUpdateUser } from "../../../lib/fetchAndUpdateUser";
import { LoginReqBody } from "@shared/types/Requests/Post";
import Cookies from "js-cookie";
import { fetchErrorUpdated, userUpdated } from "../../../reduxSlices/connection";
import { socketConnect } from "../../../middleware/socketMiddleware";
import { useTranslation } from "react-i18next";
import capitalize from "@shared/utils/capitalize";
import { LoaderSpinner } from "../../LoaderSpinner/LoaderSpinner";
import { toast } from "react-toastify";
import { FormButton } from "../Form/FormButton.tsx/FormButton";
import { RedirectLink } from "../Form/RedirectLink/RedirectLink";
import { FormInput } from "../Form/FormInput/FormInput";
import { FormError } from "../Form/FormError/FormError";
import { sharedConfig } from "@shared/config/sharedConfig";

import formStyles from "../Form/Form.module.css";

interface Props {
	loginMode: boolean;
}

interface Errors {
	username: string;
	email: string;
	password: string;
	passwordRepeat: string;
	form: string;
}

export default function AuthForm(props: Props) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

	const [passwordChanged, setPasswordChanged] = useState(true);

	const router = useRouter();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState<Errors>({
		username: "",
		email: "",
		password: "",
		passwordRepeat: "",
		form: "",
	});

	useEffect(() => {
		setPasswordChanged(true);
	}, [props.loginMode]);

	useEffect(() => {
		if (isAuthenticated()) {
			router.push("/");
		}
	}, [router]);

	function isDataValid() {
		if (
			!username ||
			!isInRange(
				username.length,
				sharedConfig.limits.usernameMinLength,
				sharedConfig.limits.usernameMaxLength
			)
		) {
			return false;
		}
		if (!email || !validateEmail(email)) {
			return false;
		}
		if (
			!password ||
			!isInRange(
				password.length,
				sharedConfig.limits.passwordMinLength,
				sharedConfig.limits.passwordMaxLength
			)
		) {
			return false;
		}
		if (!passwordRepeat || passwordRepeat !== password) {
			return false;
		}
		return true;
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setError("form", "");
		if (props.loginMode) {
			await signIn();
		} else {
			await signUp();
		}

		setLoading(false);
	};

	async function signIn() {
		try {
			const body: LoginReqBody = { email, password };
			const url = `${config.SERVER_URL}/auth/login`;
			const response = await fetch(url, {
				method: "post",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
			});
			const json = await response.json();
			if (response.status === 200) {
				await handleAuthentication(response);
			} else if (response.status === 401) {
				setError("form", t("form.incorrectCredentials"));
			} else if (response.status === 429) {
				await handleFailedLoginLimitReached(json);
			} else {
				setError("form", t("error.serverError"));
			}
		} catch (e) {
			handleFetchError(e);
		}
	}

	async function signUp() {
		try {
			const body = JSON.stringify({ email, username, password });
			const url = `${config.SERVER_URL}/auth/register`;
			const response = await fetch(url, {
				method: "post",
				body,
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 201) {
				await handleAuthentication(response);
			} else if (response.status === 422) {
				setError("form", "Provided data is incorrect.");
			} else {
				setError("form", "Attempt to sign up failed.");
			}
		} catch (e) {
			handleFetchError(e);
		}
	}

	async function handleAuthentication(response: Response) {
		const authToken = response.headers.get("Authorization");
		if (authToken) {
			const user = await fetchAndUpdateUser(authToken, dispatch);
			if (!user) {
				return;
			}
			Cookies.set("Authorization", authToken, {
				path: "/",
				sameSite: "Lax",
			});
			if (user.emailVerified) {
				dispatch(socketConnect({ authToken }));
				router.push("/");
			} else {
				router.push("/verify-your-email");
			}
		}
	}

	async function handleUsernameBlur() {
		if (!username) {
			return;
		}
		const response = await usernameExists(username);
		if (response && response.status === 409) {
			setError("username", t("form.usernameTaken"));
		} else {
			setError("username", "");
		}
	}

	async function handleUsernameChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		if (props.loginMode) {
			return;
		}
		const username = event.target.value;
		setUsername(username);
	}

	function handlePasswordBlur() {
		if (props.loginMode) {
			return;
		}
		if (password && password.length < sharedConfig.limits.passwordMinLength) {
			setError(
				"password",
				t("form.passwordTooShort", {amount: sharedConfig.limits.passwordMinLength})
			);
		} else {
			setError("password", "");
		}
	}

	async function handleEmailBlur() {
		if (props.loginMode) {
			return;
		}
		

		const isEmail = validateEmail(email);
		if (!isEmail) {
			setError("email", t("form.invalidEmail"));
			return;
		}
		const emailTaken = await emailExists(email);
		if (emailTaken) {
			setError("email", t("form.emailTaken"));
		} else {
			setError("email", "");
		}
	}

	function setError(element: keyof Errors, value: string) {
		setErrors((prev) => {
			return {
				...prev,
				[element]: value,
			};
		});
	}

	function handlePasswordRepeatChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const repeatPassword = event.target.value;
		setPasswordRepeat(repeatPassword);
		checkPasswordsSame(password, repeatPassword);
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		const password = event.target.value;
		setPassword(password);
	}

	useEffect(() => {
		checkPasswordsSame(password, passwordRepeat);
	}, [password, passwordRepeat]);

	useEffect(() => {
		setPasswordChanged(true);
	}, [password]);

	function checkPasswordsSame(password: string, repeatPassword: string) {
		if (password && repeatPassword && password !== repeatPassword) {
			setError("passwordRepeat", t("form.passwordsMustBeSame"));
		} else {
			setError("passwordRepeat", "");
		}
	}

	function handleFetchError(error: any) {
		if (error instanceof TypeError) {
			dispatch(fetchErrorUpdated(true));
		} else {
			console.error(error);
		}
	}

	async function usernameExists(username: string) {
		const url = `${config.SERVER_URL}/user/username-exists/${username}`;
		try {
			return await fetch(url, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (e) {
			return false;
		}
	}

	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	async function emailExists(email: string) {
		try {
			const url = `${config.SERVER_URL}/user/email-exists/${email}`;
			const result = await fetch(url, {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			});
			return result.status === 409;
		} catch (error) {
			return false;
		}
	}

	const [buttonActive, setButtonActive] = useState(false);

	useEffect(() => {
		document.addEventListener("keydown", handleEnterDown);

		return () => {
			document.removeEventListener("keydown", handleEnterDown);
		};
	});

	function handleEnterDown(e: KeyboardEvent) {
		if (e.key === "Enter") {
			setButtonActive(true);
			setTimeout(function () {
				setButtonActive(false);
			}, 200);
		}
	}

	const connectionError = useAppSelector(
		(state) => state.connection.fetchError
	);

	async function handleLimitReached(json: any) {
		toast(
			t("toast.request limit reached", {
				tryAfter: json.tryAfter,
			}),
			{
				type: "error",
			}
		);
	}

	async function handleFailedLoginLimitReached(json: any) {
		setError(
			"form",
			t("menu.login request limit reached", { tryAfter: json.tryAfter })
		);
	}

	return (
		<>
			{
				<div className={formStyles.container}>
					<h3>
						{capitalize(
							t(
								props.loginMode
									? "menu.sign in"
									: "menu.new account"
							)
						)}
					</h3>
					<form onSubmit={handleSubmit} className={formStyles.form}>
					<FormInput
							placeholder={"e-mail"}
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={handleEmailBlur}
							required
							error={errors.email}
						/>
						{!props.loginMode && (
							<FormInput
								placeholder={t("menu.username")}
								type="text"
								id="username"
								value={username}
								onChange={handleUsernameChange}
								onBlur={handleUsernameBlur}
								required
								error={errors.username}
								minLength={
									sharedConfig.limits.usernameMinLength
								}
								maxLength={
									sharedConfig.limits.usernameMaxLength
								}
							/>
						)}
						
						<FormInput
							placeholder={t("menu.password")}
							type="password"
							id="password"
							value={password}
							onChange={handlePasswordChange}
							onBlur={handlePasswordBlur}
							required
							error={errors.password}
							minLength={
								sharedConfig.limits.passwordMinLength
							}
							maxLength={
								sharedConfig.limits.passwordMaxLength
							}
						/>
						{!props.loginMode && (
							<FormInput
								placeholder={
									t("menu.repeat password") ||
									"repeat password"
								}
								type="password"
								value={passwordRepeat}
								onChange={handlePasswordRepeatChange}
								required
								error={errors.passwordRepeat}
								minLength={
									sharedConfig.limits.passwordMinLength
								}
								maxLength={
									sharedConfig.limits.passwordMaxLength
								}
							/>
						)}
						{errors.form && <FormError error={errors.form} />}
						<FormButton
							active={buttonActive}
							loading={loading}
							label={capitalize(
								t(
									props.loginMode
										? "menu.sign in"
										: "menu.sign up"
								)
							)}
							loadingLabel={capitalize(
								t(
									props.loginMode
										? "menu.signing in"
										: "menu.signing up"
								)
							)}
						/>
						{!loading && connectionError && (
							<FormError error={t("error.connectError")} />
						)}
						{props.loginMode && (
							<RedirectLink
								linkText={t("form.forgotPassword?")}
								href={"/forgot-password"}
								fontSize="13px"
							/>
						)}

						{loading && (
							<div className={formStyles.loaderSpinnerWrapper}>
								<LoaderSpinner />
							</div>
						)}
					</form>
					{props.loginMode ? (
						<RedirectLink
							label={capitalize(
								t("menu.don't have an account yet?")
							)}
							linkText={capitalize(t("menu.create one"))}
							href={"./sign-up"}
						/>
					) : (
						<RedirectLink
							label={capitalize(
								t("menu.already have an account?")
							)}
							linkText={capitalize(
								t("menu.sign in", {
									context: "reflexive pronoun",
								})
							)}
							href={"./sign-in"}
						/>
					)}
				</div>
			}
		</>
	);
}
function isInRange(length: number, usernameMinLength: number, usernameMaxLength: number): boolean {
	throw new Error("Function not implemented.");
}

