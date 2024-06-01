import type {NextPage} from "next";
import {MainMenu} from "../components/MainMenu/MainMenu";
import React from "react";
import {UserProfile} from "../components/UserProfile/UserProfile";
import AuthGuard from "../components/RouteGuards/AuthGuard";

const Home: NextPage = () => {


    return (
        <AuthGuard>
            <MainMenu UserComponent={<UserProfile/>}/>
        </AuthGuard>
    );
};

export default Home
