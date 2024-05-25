import styles from "./UserProfile.module.css";
import ResizableImage from "../ResizableImage/ResizableImage";
import dummyAvatarImg from "public/dummy-avatar.jpg";

import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteAuthCookie} from "../../utils/auth/deleteAuthCookie";
import {userUpdated} from "../../reduxSlices/auth";

interface Props {
}

export function UserProfile(props: Props) {

    const router = useRouter();
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();


    function handleSignOut() {
        deleteAuthCookie();
        dispatch(userUpdated(null));
        router.push("/signIn").catch((e) => console.error(e));
    }


    return <div className={styles.container}>

        <div className={styles.avatar}>
            <ResizableImage src={dummyAvatarImg} alt={"avatar"}/>
        </div>
        <h2>{user?.username}</h2>

        <span className={styles.signOutLink} onClick={handleSignOut}>Sign out</span>
    </div>
}
