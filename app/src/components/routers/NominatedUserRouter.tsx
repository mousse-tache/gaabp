import { Router } from "@reach/router";
import React from "react";

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
  () => import("@aabp/components/ressources/AccueilRessources"),
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

import PermissionTypes from "@aabp/auth/permissionTypes";
import usePermissions from "@aabp/auth/usePermissions";
import SuspenseNoSSR from "@aabp/components/lazy-load/SuspenseNoSSR";

const NominatedUserRouter = (): React.ReactNode => {
  const perms = usePermissions();

  return (
    <SuspenseNoSSR>
      <Router basepath="/app">
        <Profile path="/account" />
        <SectionMembre path="/membres" />
        {perms(PermissionTypes.ViewUsers) && <EditMembre path="membre/:id" />}
        <Group path="/groupes" />
        <EditGroup path="/groupe/:id" />
        <UnitSection path="/unites" />
        <EditUnit path="/unite/:id" />
        <Formation path="/formation" />
        <FormationResume path="/formation/:niveau/" />
        <FormationResume path="/formation/:niveau/:branche" />
        {perms(PermissionTypes.RecommendFormation) && (
          <RecommendFormation path="/formation/recommandations" />
        )}
        <AccueilRessources path="/ressources" />
        {perms(PermissionTypes.ViewRecensementSummary) && (
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
