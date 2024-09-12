import type {NextPage} from "next";
import {MainMenu} from "../components/MainMenu/MainMenu";
import React from "react";
import {UserProfile} from "../components/UserProfile/UserProfile";
import AuthGuard from "../components/RouteGuard/RouteGuard";

const Home: NextPage = () => {


    return (
            <MainMenu UserComponent={<UserProfile/>}/>
    );
};

export default Home
