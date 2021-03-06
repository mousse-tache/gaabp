import React, { useContext } from "react";

import AppContext from "@aabp/context/appContext";

import Profile from "@aabp/components/profile/profile";
import GlobalReport from "@aabp/components/home/globalReport/globalReport";

import "./home.css";

const Home = () => {
    const { authedUser } = useContext(AppContext);

    return (
        <div>
            {!authedUser.isAdmin && <Profile />}

            {authedUser.isAdmin && <GlobalReport />}
        </div>
    );
};

export default Home;