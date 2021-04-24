import React, { useState } from "react";
import Proptypes from "prop-types";
import { Paper, Tab, Tabs } from '@material-ui/core';

import Unit from "./unit";
import RecensementOverview from "../recensement/recensementOverview";

import Permissions from "@aabp/auth/permissions";
import useAuthUser from "@aabp/auth/useAuthUser";
import PermissionTypes from "@aabp/auth/permissionTypes";

const UnitSection = ({defaultValue}) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (        
        <Paper className="section-unit">
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="mainnav"
            className="ressources-nav"
             >
                <Tab disableRipple component="a" label="Liste des unités" />
                {Permissions(PermissionTypes.ViewRecensementSummary, useAuthUser()) && <Tab disableRipple component="a" label="Recensements" />}
            </Tabs>
            {
                value === 0 && <Unit />
            }
            {
                value === 1 && <RecensementOverview />
            }
        </Paper> 
    );
};

UnitSection.propTypes = {
    defaultValue: Proptypes.number
};

UnitSection.defaultProps = {
    defaultValue: 0
};

export default UnitSection;