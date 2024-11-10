import { useRouter } from "next/router";
import config from "../../config/config";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { fetchAndUpdateUser } from "../../lib/fetchAndUpdateUser";
import { getAuthToken } from "../../utils/auth/getAuthToken";
import { useDispatch } from "react-redux";
import { userUpdated } from "../../reduxSlices/connection";
import { useAppSelector } from "../../store/hooks";

enum VERIFICATION_STATUS {
	SUCCESS = "success",
	FAILURE = "failure",
	PENDING = "pending",
}

export default function EmailActivation() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [verificationStatus, setVerificationStatus] = useState(
		VERIFICATION_STATUS.PENDING
	);

	const [redirectCounter, setRedirectCounter] = useState(10);
	const user = useAppSelector((state) => state.connection.user);

	useEffect(() => {
		const token = router.query.token as string;
		if (!token) {
			return;
		}

		const url = `${config.SERVER_URL}/email-verification/verify/${token}`;
		fetch(url, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((result) => {
			if (result.ok) {
				setVerificationStatus(VERIFICATION_STATUS.SUCCESS);
				localStorage.setItem("emailVerified", "true");
				const authToken = getAuthToken();
				if (authToken) {
					fetchAndUpdateUser(authToken, dispatch);
				}
			} else {
				setVerificationStatus(VERIFICATION_STATUS.FAILURE);
			}
		});
	}, [router.query, dispatch]);

	useEffect(() => {
		if (verificationStatus !== VERIFICATION_STATUS.SUCCESS) {
			return;
		}
		const interval = setInterval(() => {
			setRedirectCounter((prevCounter) => {
				if (prevCounter <= 1) {
					clearInterval(interval);
					router.push("/");
				}
				return prevCounter - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [verificationStatus, router]);

	return (
		<div className={styles.container}>
			{verificationStatus === VERIFICATION_STATUS.SUCCESS && (
				<>
					<h4 className={`${styles.title} ${styles.positive}`}>
						Gratulacje!
					</h4>
					<p>
						Twoje konto zostało{" "}
						<span className={styles.positive}>pomyślnie</span>{" "}
						zweryfikowane. Możesz teraz{" "}
						<Link href={"/sign-in"} className={styles.link}>
							zalogować
						</Link>{" "}
						się do naszego serwisu. Dziękujemy za potwierdzenie
						swojego adresu e-mail. Zostaniesz przekierowywany za{" "}
						{redirectCounter}s;
					</p>
				</>
			)}
			{verificationStatus === VERIFICATION_STATUS.FAILURE && (
				<>
					<h4 className={`${styles.title} ${styles.negative}`}>
						Weryfikacja nie powiodła się
					</h4>
					<p>
						Wystąpił{" "}
						<span className={styles.negative}>problem</span> podczas
						weryfikacji twojego konta. Możliwe przyczyny to
						nieprawidłowy lub wygasły link. Prosimy o sprawdzenie
						linku.
					</p>
					<Link className={styles.link} href={"/"}>
						Wróć
					</Link>
				</>
			)}
		</div>
	);
}
