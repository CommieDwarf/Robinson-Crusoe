import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../utils/auth/isAuthenticated";
import { useAppSelector } from "../../store/hooks";
import { getAuthToken } from "../../utils/auth/getAuthToken";
import { isTokenValid } from "../../utils/auth/isTokenValid";
import { useHistory } from "components/UserHistoryManager/UserHistoryManager";

type Props = {
	children: ReactNode;
};

const RouteGuard: React.FC<Props> = ({ children }) => {
	const router = useRouter();

	const user = useAppSelector((state) => state.connection.user);
	const connected = useAppSelector((state) => state.connection.socketConnected);

	const historyManager = useHistory();

	

	useEffect(() => {
		const notProtectedPaths = ["/sign-in", "/sign-out", "/sign-up", "/forgot-password"];
		const requiresAuth = !notProtectedPaths.some((path) =>
			router.pathname.startsWith(path)
		);

		if (!requiresAuth && user && isAuthenticated()) {

			if (historyManager?.canGoBack()) {
				router.back();
			} else {
				router.push("/");
			}
		}

		if (requiresAuth && !isAuthenticated()) {
			router.push("/sign-in");
			return;
		}

		//kiedy user nie aktywował swojego konta
		if (
			user &&
			!user.emailVerified &&
			!router.pathname.includes("email-activation") &&
			!router.pathname.includes("verify-your-email")
		) {
			router.push("/verify-your-email");
			//kiedy user ma zwerykowane konto 
		} else if (
			user &&
			user.emailVerified &&
			router.pathname.includes("verify-your-email")
		) {
			router.push("/");
		} 
	}, [user, router, connected]);
	

	return <>{children}</>;
};

export default RouteGuard;
