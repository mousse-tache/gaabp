import { Router } from "@reach/router";
import React, { useContext } from "react";

import AppContext from "@aabp/context/app/appContext";

const Profile = React.lazy(() => import("@aabp/components/profile/Profile"));
const EditMembre = React.lazy(
  () => import("@aabp/components/membres/EditMembre"),
);
const Group = React.lazy(() => import("@aabp/components/groups/Group"));
const EditGroup = React.lazy(() => import("@aabp/components/groups/EditGroup"));
const UnitSection = React.lazy(
  () => import("@aabp/components/units/UnitSection"),
);
const EditUnit = React.lazy(() => import("@aabp/components/units/EditUnit"));
const Formation = React.lazy(
  () => import("@aabp/components/formation/Formation"),
);
const AccueilRessources = React.lazy(
  () => import("@aabp/components/ressources/accueilRessources"),
);
const RecommendFormation = React.lazy(
  () => import("@aabp/components/formation/RecommendFormation"),
);
const FormationResume = React.lazy(
  () => import("@aabp/components/formation/components/FormationResume"),
);
const Home = React.lazy(() => import("@aabp/components/home/Home"));
const SectionMembre = React.lazy(
  () => import("@aabp/components/membres/SectionMembre"),
);
const FeatureList = React.lazy(
  () => import("@aabp/components/feature-flagging/FeatureList"),
);

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import SuspenseNoSSR from "@aabp/components/lazy-load/SuspenseNoSSR";

const NominatedUserRouter = () => {
  const { authedUser } = useContext(AppContext);

  return (
    <SuspenseNoSSR>
      <Router basepath="/app">
        <Profile path="/account" />
        <SectionMembre path="/membres" />
        {Permissions(PermissionTypes.ViewUsers, authedUser) && (
          <EditMembre path="membre/:id" />
        )}
        <Group path="/groupes" />
        <EditGroup path="/groupe/:id" />
        <UnitSection path="/unites" />
        <EditUnit path="/unite/:id" />
        <Formation path="/formation" />
        <FormationResume path="/formation/:niveau/" />
        <FormationResume path="/formation/:niveau/:branche" />
        {Permissions(PermissionTypes.RecommendFormation, authedUser) && (
          <RecommendFormation path="/formation/recommandations" />
        )}
        <AccueilRessources path="/ressources" />
        {Permissions(PermissionTypes.ViewRecensementSummary, authedUser) && (
          <UnitSection defaultValue={1} path="/recensements" />
        )}
        <SectionMembre defaultValue={1} path="/nominations" />
        <SectionMembre defaultValue={2} path="/eligibilite" />
        <FeatureList path="/features" />
        <Home default />
      </Router>
    </SuspenseNoSSR>
  );
};

export default NominatedUserRouter;
