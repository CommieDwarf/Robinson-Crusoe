import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../utils/auth/isAuthenticated";
import { useAppSelector } from "../../store/hooks";
import { getAuthToken } from "../../utils/auth/getAuthToken";
import { isTokenValid } from "../../utils/auth/isTokenValid";

type Props = {
	children: ReactNode;
};

const RouteGuard: React.FC<Props> = ({ children }) => {
	const router = useRouter();

	const user = useAppSelector((state) => state.connection.user);
	const connected = useAppSelector((state) => state.connection.socketConnected);

	useEffect(() => {
		const notProtectedPaths = ["/sign-in", "/sign-out", "/sign-up", "/forgot-password", "/reset-password"];
		const requiresAuth = !notProtectedPaths.some((path) =>
			router.pathname.startsWith(path)
		);

		if (requiresAuth) {
			const authToken = getAuthToken();
			if (!authToken || !isTokenValid(authToken)) {
				router.push("/sign-in");
			}
		}

		if (
			user &&
			!user.emailVerified &&
			!router.pathname.includes("email-activation") &&
			!router.pathname.includes("verify-your-email")
		) {
			router.push("/verify-your-email");
		} else if (
			user &&
			user.emailVerified &&
			router.pathname.includes("verify-your-email")
		) {
			router.push("/");
		} else if (
			user &&
			user.emailVerified &&
			router.pathname.includes("email-activation")
		) {
			router.push("/");
		}
	}, [user, router, connected]);

	return <>{children}</>;
};

export default RouteGuard;
