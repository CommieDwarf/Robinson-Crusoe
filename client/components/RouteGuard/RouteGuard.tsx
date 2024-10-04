import React, {ReactNode, useEffect} from "react";
import {useRouter} from "next/router";
import {isAuthenticated} from "../../utils/auth/isAuthenticated";
import { useAppSelector } from "../../store/hooks";

type Props = {
    children: ReactNode;
};

const RouteGuard: React.FC<Props> = ({children}) => {
    const router = useRouter();

    const user = useAppSelector(state => state.connection.user);




    useEffect(() => {
         if (user && !user.emailVerified && !router.pathname.includes("email-activation")) {
            console.log("A")
            router.push("/verify-your-email")
        } else if (user && user.emailVerified && router.pathname.includes("verify-your-email")) {
            console.log("B")
            router.push("/");
        } else if (user && user.emailVerified && router.pathname.includes("email-activation")) {
            console.log("C")
            router.push("/");
        }
        

    }, [user, router]);

    return <>{children}</>
};

export default RouteGuard;
