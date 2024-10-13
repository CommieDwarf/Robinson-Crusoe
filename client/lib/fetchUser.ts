import config from "../config";
import {UserData} from "@shared/types/UserData/UserData";

export async function fetchUser(authToken: string) {
    const url = `${config.SERVER_URL}/getUser`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        },
        mode: "cors"
    });
    if (!response.ok) {
        throw new Error("Couldn't fetch user data.");
    }
    const json = await response.json();
    return json as UserData;
}
