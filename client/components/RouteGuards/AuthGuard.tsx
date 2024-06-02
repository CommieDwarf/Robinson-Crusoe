import React, {ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import {isAuthenticated} from "../../utils/auth/isAuthenticated";

type Props = {
    children: ReactNode;
};

const AuthGuard: React.FC<Props> = ({children}) => {
    const router = useRouter();

    useEffect(() => {

        if (!isAuthenticated()) {
            router.push('/signIn');
        }
    }, []);

    return <>{children}</>
};

export default AuthGuard;
