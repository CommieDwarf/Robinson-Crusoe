import { useAppDispatch } from "../store/hooks";
import config from "../config/config";
import { UserData } from "@shared/types/UserData/UserData";
import { fetchErrorUpdated, userUpdated } from "../reduxSlices/connection";
import { toast } from "react-toastify";
import i18next, { i18n } from "i18next"; 

export const fetchAndUpdateUser = async (authToken: string, dispatch: ReturnType<typeof useAppDispatch>) => {
    const url = `${config.SERVER_URL}/user/get`;
    
    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${authToken}`,
            },
            mode: "cors",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const json = await response.json();
        if (response.status === 429) {
            toast(i18next.t("toast.request limit reached", {
                tryAfter: json.tryAfter
            }))
            return null;
        }

        dispatch(fetchErrorUpdated(false));
        dispatch(userUpdated(json));
        return json as UserData;
        
    } catch (e) {
        if (e instanceof TypeError) {
            dispatch(fetchErrorUpdated(true));
            return null;
        } else {
            console.error("Error fetching user data:", e);
            throw e; 
        }
    }
};
