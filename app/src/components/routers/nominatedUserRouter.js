import React, { useContext } from "react"
import { Router } from "@reach/router"
import Profile from "./../profile/profile"
import Membres from "./../membres/membres"
import EditMembre from "./../membres/editMembre"
import Group from "./../groups/group"
import EditGroup from "./../groups/editGroup"
import Unit from "./../units/unit"
import EditUnit from "./../units/editUnit"
import Formation from "./../formation/formation"
import AccueilRessources from "../ressources/accueilRessources"
import UserContext from "../../context/userContext"
import Permissions from "../../auth/permissions"
import PermissionTypes from "../../auth/permissionTypes"

const NominatedUserRouter = () => {
    const user = useContext(UserContext).authedUser;

    return (
    <Router basepath="/app"> 
        <Profile path="/account" />
        <Membres path="/membres" />
        {Permissions(user, PermissionTypes.ViewUsers) && <EditMembre path="membre/:id" />}
        <Group path="/groupes" />
        <EditGroup path="/groupe/:id" />
        <Unit path="/unites" />
        <EditUnit path="/unite/:id" />
        <Formation path="/formation" />
        <AccueilRessources path="/ressources" />
        <Profile default />
    </Router> 
    )
};

export default NominatedUserRouter;