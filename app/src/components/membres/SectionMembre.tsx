import { Tab, Tabs } from "@material-ui/core";
import Proptypes from "prop-types";
import React, { useState } from "react";

import Features from "@aabp/features/features";
import { isFeatureActivated } from "@aabp/features/useFeatures";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import useAuthUser from "@aabp/auth/useAuthUser";
import Card from "../design-system/Card/Card";

const Membres = React.lazy(() => import("./Membres"));
const NominationsOverview = React.lazy(
  () => import("@aabp/components/nominations/NominationsOverview"),
);
const Eligibilite = React.lazy(
  () => import("@aabp/components/membres/eligibilite/Eligibilite"),
);

import SuspenseNoSSR from "../lazy-load/SuspenseNoSSR";

const SectionMembre = ({ defaultValue }) => {
  const authedUser = useAuthUser();
  const [value, setValue] = useState(defaultValue);
  const eligibiteEnabled = isFeatureActivated(Features.EligibiliteHonneurs);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="section-membres">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="mainnav"
        className="ressources-nav"
      >
        <Tab disableRipple component="a" label="Liste des membres" />
        <Tab disableRipple component="a" label="Nominations" />
        {eligibiteEnabled &&
          Permissions(PermissionTypes.AddDecoration, authedUser) && (
            <Tab disableRipple component="a" label="Éligibilité" />
          )}
      </Tabs>
      <SuspenseNoSSR>
        {value === 0 && <Membres />}
        {value === 1 && <NominationsOverview />}
        {value === 2 && <Eligibilite />}
      </SuspenseNoSSR>
    </Card>
  );
};

SectionMembre.propTypes = {
  defaultValue: Proptypes.number,
};

SectionMembre.defaultProps = {
  defaultValue: 0,
};

export default React.memo(SectionMembre);
