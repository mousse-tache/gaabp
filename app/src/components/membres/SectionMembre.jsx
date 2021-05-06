import React, { useState } from "react";
import Proptypes from "prop-types";
import { Paper, Tab, Tabs } from '@material-ui/core';

const Membres = React.lazy(() => import('./Membres'));
const NominationsOverview = React.lazy(() => import("@aabp/components/nominations/NominationsOverview"));

import SuspenseNoSSR from "../lazy-load/SuspenseNoSSR";

const SectionMembre = ({defaultValue}) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return (        
        <Paper className="section-membres">
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
            </Tabs>
            <SuspenseNoSSR>
                {
                    value === 0 && <Membres />
                }
                {
                    value === 1 && <NominationsOverview />
                }
            </SuspenseNoSSR>
        </Paper> 
    );
};

SectionMembre.propTypes = {
    defaultValue: Proptypes.number
};

SectionMembre.defaultProps = {
    defaultValue: 0
};

export default React.memo(SectionMembre);