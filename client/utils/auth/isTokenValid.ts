import { jwtDecode } from "jwt-decode";

export function isTokenValid(authToken: string) {
	if (authToken) {
		const decoded = jwtDecode(authToken);
		const currentTimestampInSeconds = Date.now() / 1000;
		return (
			!decoded.exp ||
			(decoded.exp && decoded.exp > currentTimestampInSeconds)
		);
	}
	return false;
}
