import Cookies from "js-cookie";

export function deleteAuthCookie() {
	Cookies.remove("Authorization");
}
