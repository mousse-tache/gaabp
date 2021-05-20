import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";

import AppContext from "@aabp/context/appContext";

const Profile = React.lazy(() => import("@aabp/components/profile/profile"));
const EditMembre = React.lazy(() => import("@aabp/components/membres/editMembre"));
const Group = React.lazy(() => import("@aabp/components/groups/Group"));
const EditGroup = React.lazy(() => import("@aabp/components/groups/editGroup"));
const UnitSection = React.lazy(() => import("@aabp/components/units/UnitSection"));
const EditUnit = React.lazy(() => import("@aabp/components/units/EditUnit"));
const Formation = React.lazy(() => import("@aabp/components/formation/formation"));
const AccueilRessources = React.lazy(() => import("@aabp/components/ressources/accueilRessources"));
const RecommendFormation = React.lazy(() => import("@aabp/components/formation/recommendFormation"));
const FormationResume = React.lazy(() => import("@aabp/components/formation/components/formationResume"));
const Home = React.lazy(() => import("@aabp/components/home/Home"));
const SectionMembre = React.lazy(() => import("@aabp/components/membres/SectionMembre"));
const Features = React.lazy(() => import("@aabp/components/feature-flagging/Features"));

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import SuspenseNoSSR from "@aabp/components/lazy-load/SuspenseNoSSR";
import { useSnackbar } from "notistack";

const NominatedUserRouter = () => {
    const { authedUser } = useContext(AppContext);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar(
            "L'assemblée générale annuelle se tiendra le 12 juin à 12h30. Détails dans la section ressource",
            {variant: "info"}
        );
    }, []);

    return (
    <SuspenseNoSSR>
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
            <Features path="/features" />
            <Home default />
        </Router> 
    </SuspenseNoSSR>
    );
};

export default NominatedUserRouter;