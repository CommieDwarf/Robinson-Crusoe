import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ReactNode, useEffect} from "react";
import {isAuthenticated} from "../utils/auth/isAuthenticated";
import {getAuthToken} from "../utils/auth/getAuthToken";
import {fetchUser} from "../utils/auth/fetchUser";
import {userUpdated} from "../reduxSlices/auth";
import {socketConnect} from "../middleware/socketMiddleware";

interface Props {
    children: ReactNode;
}

export function GlobalWrapper(props: Props) {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const authenticated = isAuthenticated();
        if (authenticated && !user) {
            const token = getAuthToken() as string;
            fetchUser(token).then((response) => {
                dispatch(userUpdated(response))
            })
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const token = getAuthToken();
            if (token) {
                dispatch(socketConnect({authToken: token}));
            }
        }
    }, [dispatch, user])

    return <>
        {props.children}
    </>
}
