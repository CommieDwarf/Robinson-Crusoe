import styles from "./AuthForm.module.css";
import React, {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import config from "../../config";
import {useRouter} from "next/router";
import {isAuthenticated} from "../../utils/auth/isAuthenticated";
import {useAppDispatch} from "../../store/hooks";
import {fetchUser} from "../../utils/auth/fetchUser";
import {LoginReqBody} from "@shared/types/Requests/Post";
import Cookies from "js-cookie";
import {socketEmitter} from "../../pages/_app";
import {userUpdated} from "../../reduxSlices/auth";

interface Props {
    isLogin: boolean;
}


interface Errors {
    username: string,
    email: string,
    password: string,
    passwordRepeat: string,
    form: string,
}

export default function AuthForm(props: Props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const router = useRouter();

    const dispatch = useAppDispatch()


    const [errors, setErrors] = useState<Errors>({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        form: "",
    })

    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/").catch(e => console.error(e));
        }
    }, [])


    function isDataValid() {
        if (!username) {
            return false;
        }
        if (!email || !validateEmail(email)) {
            return false;
        }
        if (!password || password.length < 8) {
            return false;
        }
        if (!passwordRepeat || passwordRepeat !== password) {
            return false;
        }
        return true;
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.isLogin) {
            await signIn();
        } else {
            await signUp();
        }
    };


    async function signIn() {
        const body: LoginReqBody = {email, password};
        const url = `${config.SERVER_URL}/login`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            await handleAuthentication(response);
        } else if (response.status === 401) {
            setError("form", "Provided email or password is incorrect.")
        } else {
            setError("form", "Attempt to sign in failed.")
        }
    }

    async function signUp() {
        if (!isDataValid()) {
            setError("form", "Provided data is incorrect.");
            return;
        }
        const body = JSON.stringify({email, username, password});
        const url = `${config.SERVER_URL}/register`;
        const response = await fetch(url, {
            method: "post",
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 201) {
            await handleAuthentication(response);
        } else if (response.status === 422) {
            setError("form", "Provided data is incorrect.")
        } else {
            setError("form", "Attempt to sign up failed.")
        }
    }

    async function handleAuthentication(response: Response) {
        const token = response.headers.get("Authorization");
        if (token) {
            Cookies.set("Authorization", token);
            socketEmitter.connectSocketWithAuthToken(token);
            const user = await fetchUser(token);
            dispatch(userUpdated(user));
            router.push("/").catch((e) => console.error(e));
        }
    }


    async function handleUsernameBlur() {
        if (!username) {
            return;
        }
        const response = await usernameExists(username);
        if (response.status === 409) {
            setError("username", "This user name is taken")
        } else {
            setError("username", "");
        }
    }

    async function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.isLogin) {
            return;
        }
        const username = event.target.value;
        setUsername(username);
    }

    function handlePasswordBlur() {
        if (props.isLogin) {
            return;
        }
        if (password && password.length < 8) {
            setError("password", "Password has to be at least 8 characters long.")
        } else {
            setError("password", "");
        }
    }


    async function handleEmailBlur() {
        if (props.isLogin) {
            return;
        }
        const isEmail = validateEmail(email);
        if (!isEmail) {
            setError("email", "Provided e-mail isn't valid.");
            return;
        }
        const emailTaken = await emailExists(email);
        if (emailTaken) {
            setError("email", "This e-mail is taken.")
        } else {
            setError("email", "");
        }
    }

    function setError(element: keyof Errors, value: string) {
        setErrors((prev) => {
            return {
                ...prev,
                [element]: value,
            }
        })
    }

    function handlePasswordRepeatChange(event: React.ChangeEvent<HTMLInputElement>) {
        const repeatPassword = event.target.value;
        setPasswordRepeat(repeatPassword);
        checkPasswordsSame(password, repeatPassword);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;
        setPassword(password);
        checkPasswordsSame(password, passwordRepeat);
    }

    function checkPasswordsSame(password: string, repeatPassword: string) {
        if (password && repeatPassword && password !== repeatPassword) {
            setError("passwordRepeat", "Passwords must be the same.")
        } else {
            setError("passwordRepeat", "")
        }
    }


    async function usernameExists(username: string) {
        const url = `${config.SERVER_URL}/usernameExists/${username}`;

        return fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
            },
        })
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
            const url = `${config.SERVER_URL}/emailExists/${email}`;
            const result = await fetch(url, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return result.status === 409;
        } catch (error) {
            console.log(error);
        }
    }

    const [buttonActive, setButtonActive] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", handleEnterDown);

        return () => {
            document.removeEventListener("keydown", handleEnterDown)
        }
    })

    function handleEnterDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            setButtonActive(true);
            setTimeout(function () {
                setButtonActive(false);
            }, 200);
        }
    }


    return (
        <div className={styles.container}>
            <h3>{props.isLogin ? "Sign in" : "New Account"}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                {!props.isLogin && <div className={styles.row}>
                    <input
                        placeholder={"username"}
                        className={styles.input}
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        onBlur={handleUsernameBlur}
                        required
                    />
                    <div className={styles.error}>{errors.username &&
                        <i className="icon-warning"></i>}{errors.username}</div>
                </div>}
                <div className={styles.row}>
                    <input
                        placeholder={"e-mail"}
                        className={styles.input}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        required
                    />
                    <div className={styles.error}>{errors.email && <i className="icon-warning"></i>}{errors.email}</div>
                </div>
                <div className={styles.row}>
                    <input
                        className={styles.input}
                        placeholder={"password"}
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        required
                    />
                    <div className={styles.error}>
                        {errors.password && <i className="icon-warning"></i>}
                        {errors.password}
                    </div>
                </div>
                {!props.isLogin &&
                    <div className={styles.row}>
                        <input
                            className={styles.input}
                            placeholder={"repeat password"}
                            type="password"
                            id="rePassword"
                            value={passwordRepeat}
                            onChange={handlePasswordRepeatChange}
                            required
                        />
                        <div className={styles.error}>
                            {errors.passwordRepeat && <i className="icon-warning"></i>}
                            {errors.passwordRepeat}
                        </div>
                    </div>
                }
                <div className={styles.error}>
                    {errors.form && <i className="icon-warning"></i>}
                    {errors.form}
                </div>
                <button type="submit"
                        className={`${styles.input} 
                        ${styles.button}
                        ${buttonActive && styles.buttonActive}`}>
                    {props.isLogin ? "Sign in" : "Sign up"}</button>
            </form>

            {props.isLogin ?
                <span className={styles.redirectText}>
                    Dont have an account yet? <Link href={"./signUp"} className={styles.link}>Create one!</Link>
                </span> :
                <span className={styles.redirectText}>
                    Already have an account? <Link href={"./signIn"} className={styles.link}>Sign in!</Link>
                </span>
            }
        </div>

    );
}

