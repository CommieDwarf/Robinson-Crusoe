import type {NextPage} from "next";
import {MainMenu} from "../components/MainMenu/MainMenu";
import React, { useEffect } from "react";
import {UserProfile} from "../components/UserProfile/UserProfile";
import AuthGuard from "../components/RouteGuard/RouteGuard";
import { useRouter } from "next/router";
import { useAppSelector } from "../store/hooks";
import { isAuthenticated } from "../utils/auth/isAuthenticated";

const Home: NextPage = () => {


    const router = useRouter();
    const connected = isAuthenticated();


    useEffect(() => {
        if (!connected) {
            router.push("/signIn");
        }
    
    }, [router, connected])


    return (
            <MainMenu UserComponent={<UserProfile/>}/>
    );
};

export default Home
