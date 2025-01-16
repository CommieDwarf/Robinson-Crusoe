import type {NextPage} from "next";
import React, { useEffect } from "react";
import {UserProfile} from "../components/UserProfile/UserProfile";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/auth/isAuthenticated";
import { MainMenu } from "components/MainMenu/MainMenu";

const Home: NextPage = () => {


    return (
            <MainMenu UserComponent={<UserProfile/>}/>
    );
};

export default Home
