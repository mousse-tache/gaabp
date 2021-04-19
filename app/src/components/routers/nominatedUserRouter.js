import React, { useContext } from "react"
import { Router } from "@reach/router"

import AppContext from "@aabp/context/appContext"

import Profile from "./../profile/profile"
import EditMembre from "./../membres/editMembre"
import Group from "./../groups/group"
import EditGroup from "./../groups/editGroup"
import UnitSection from "./../units/UnitSection"
import EditUnit from "../units/editUnit"
import Formation from "./../formation/formation"
import AccueilRessources from "../ressources/accueilRessources"
import Permissions from "../../auth/permissions"
import PermissionTypes from "@aabp/auth/permissionTypes"
import RecensementOverview from "../recensement/recensementOverview"
import RecommendFormation from "../formation/recommendFormation"
import FormationResume from "../formation/components/formationResume"
import Home from "../home/home"
import SectionMembre from "../membres/SectionMembre"

const NominatedUserRouter = () => {
    const { authedUser } = useContext(AppContext);

    return (
    <Router basepath="/app"> 
        <Profile path="/account" />
        <SectionMembre path="/membres" />
        {Permissions(PermissionTypes.ViewUsers, authedUser) && <EditMembre path="membre/:id" />}
        <Group path="/groupes" />
        <EditGroup path="/groupe/:id" />
        <UnitSection path="/unites" />
        <EditUnit path="/unite/:id" />
        <Formation path="/formation" />
        <FormationResume path="/formation/:niveau/" />
        <FormationResume path="/formation/:niveau/:branche" />
        {Permissions(PermissionTypes.RecommendFormation, authedUser) && <RecommendFormation path="/formation/recommandations" />}
        <AccueilRessources path="/ressources" />
        {Permissions(PermissionTypes.ViewRecensementSummary, authedUser) && <UnitSection defaultValue={1} path="/recensements" />}
        <SectionMembre defaultValue={1} path="/nominations" />
        <Home default />
    </Router> 
    )
};

export default NominatedUserRouter;