import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ReactNode, useEffect} from "react";
import {isAuthenticated} from "../utils/auth/isAuthenticated";
import {getAuthToken} from "../utils/auth/getAuthToken";
import {fetchUser} from "../lib/fetchUser";
import {userUpdated} from "../reduxSlices/connection";
import {socketConnect} from "../middleware/socketMiddleware";

interface Props {
    children: ReactNode;
}

export function GlobalWrapper(props: Props) {
    const user = useAppSelector(state => state.connection.user);
    const dispatch = useAppDispatch()

    
    useEffect(() => {
        function handleStorage(event: StorageEvent) {
            console.log("storage event fired!", event.key, event.newValue, event);
            if (event.key === "emailVerified" && event.newValue !== null) {
                const token = getAuthToken();
                if (token) {
                    console.log("fetching user")
                    fetchUser(token).then((user) => {
                        dispatch(userUpdated(user));
                    })
                } 
                localStorage.removeItem('emailVerified');
            }
        }
        window.addEventListener("storage", handleStorage)

        return () => {
            window.removeEventListener("storage", handleStorage);
        }
    }, [])

    useEffect(() => {
        const authenticated = isAuthenticated();
        console.log("use Effect");
        console.log("authenticated", authenticated);
        console.log("user", user);
        if (authenticated && !user) {
            const token = getAuthToken() as string;
            fetchUser(token).then((response) => {
                dispatch(userUpdated(response))
            })
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            console.log("use Effect");
            const token = getAuthToken();
            console.log("auth token", token);
            console.log("user", user);
            if (token && user.emailVerified) {
                console.log("dispatching socketConnect");
                dispatch(socketConnect({authToken: token}));
            }
        }
    }, [dispatch, user])

    return <>
        {props.children}
    </>
}
