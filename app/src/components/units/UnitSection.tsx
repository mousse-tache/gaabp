import { Tab, Tabs } from "@material-ui/core";
import Proptypes from "prop-types";
import React, { useState } from "react";

import Card from "@aabp/components/design-system/Card/Card";
import SuspenseNoSSR from "@aabp/components/lazy-load/SuspenseNoSSR";
import RecensementOverview from "../recensement/RecensementOverview";
import Unit from "./Unit";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import useAuthUser from "@aabp/auth/useAuthUser";

const UnitSection = ({
  defaultValue,
}: {
  defaultValue: number
}): React.ReactNode => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="section-unit">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="mainnav"
        className="ressources-nav"
      >
        <Tab disableRipple component="a" label="Liste des unités" />
        {Permissions(PermissionTypes.ViewRecensementSummary, useAuthUser()) && (
          <Tab disableRipple component="a" label="Recensements" />
        )}
      </Tabs>
      <SuspenseNoSSR>
        {value === 0 && <Unit />}
        {value === 1 && <RecensementOverview />}
      </SuspenseNoSSR>
    </Card>
  );
};

UnitSection.propTypes = {
  defaultValue: Proptypes.number,
};

UnitSection.defaultProps = {
  defaultValue: 0,
};

export default UnitSection;
