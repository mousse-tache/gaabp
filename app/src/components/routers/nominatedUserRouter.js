import React from "react"
import { Router } from "@reach/router"
import Profile from "./../profile/profile"
import Membres from "./../membres/membres"
import EditMembre from "./../membres/editMembre"
import Group from "./../groups/group"
import EditGroup from "./../groups/editGroup"
import Unit from "./../units/unit"
import EditUnit from "./../units/editUnit"
import Formation from "./../formation/formation"

const NominatedUserRouter = () => {
    return (
    <Router basepath="/app"> 
        <Profile path="/account" />
        <Membres path="/membres" />
        <EditMembre path="membre/:email" />
        <Group path="/groupes" />
        <EditGroup path="/groupe/:id" />
        <Unit path="/unites" />
        <EditUnit path="/unite/:id" />
        <Formation path="/formation" />
        <Profile default />
    </Router> 
    )
};

export default NominatedUserRouter;