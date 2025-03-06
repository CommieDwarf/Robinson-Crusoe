import type { NextPage } from "next";
import React from "react";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { MainMenu } from "components/MainMenu/MainMenu";

const Home: NextPage = () => {
	return <MainMenu UserComponent={<UserProfile />} />;
};

export default Home;
