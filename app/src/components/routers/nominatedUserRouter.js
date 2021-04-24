import React, { useContext } from "react";
import { Router } from "@reach/router";

import AppContext from "@aabp/context/appContext";

import Profile from "@aabp/components/profile/profile";
import EditMembre from "@aabp/components/membres/editMembre";
import Group from "@aabp/components/groups/Group";
import EditGroup from "@aabp/components/groups/editGroup";
import UnitSection from "@aabp/components/units/UnitSection";
import EditUnit from "@aabp/components/units/EditUnit";
import Formation from "@aabp/components/formation/formation";
import AccueilRessources from "@aabp/components/ressources/accueilRessources";
import RecommendFormation from "@aabp/components/formation/recommendFormation";
import FormationResume from "@aabp/components/formation/components/formationResume";
import Home from "@aabp/components/home/Home";
import SectionMembre from "@aabp/components/membres/SectionMembre";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

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
    );
};

export default NominatedUserRouter;