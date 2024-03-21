import type {NextPage} from "next";
import "../I18n/I18n";
import {MainMenu} from "../components/MainMenu/MainMenu";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import React from "react";
import {UserProfile} from "../components/UserProfile/UserProfile";


const Home: NextPage = () => {


    return (
        <AuthGuard>
            <MainMenu UserComponent={<UserProfile/>}/>
        </AuthGuard>
    );
};


export default Home
