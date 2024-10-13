import {getAuthToken} from "./getAuthToken";
import {jwtDecode} from "jwt-decode";

export function isAuthenticated() {
    const authToken = getAuthToken();
    if (authToken) {
        const decoded = jwtDecode(authToken);
        if (!decoded) {
            return false;
        }
        const currentTimestampInSeconds = Date.now() / 1000;
        return !decoded.exp || (decoded.exp && decoded.exp > currentTimestampInSeconds)
    }
    return false;
}
