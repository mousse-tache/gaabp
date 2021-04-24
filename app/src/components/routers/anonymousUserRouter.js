import React from "react";
import { Router } from "@reach/router";
import Profile from "./../profile/profile";

const AnonymousUserRouter = () => {
    return (
    <Router basepath="/app"> 
        <Profile path="/account" />
        <Profile default />
    </Router> 
    );
};

export default AnonymousUserRouter;