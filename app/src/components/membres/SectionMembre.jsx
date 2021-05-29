import React, { useState } from "react";
import Proptypes from "prop-types";
import { Paper, Tab, Tabs } from '@material-ui/core';
import { isFeatureActivated } from '@aabp/features/useFeatures';
import Features from "@aabp/features/features";

const Membres = React.lazy(() => import('./Membres'));
const NominationsOverview = React.lazy(() => import("@aabp/components/nominations/NominationsOverview"));
const Eligibilite = React.lazy(() => import("@aabp/components/membres/eligibilite/Eligibilite"));

import SuspenseNoSSR from "../lazy-load/SuspenseNoSSR";

const SectionMembre = ({defaultValue}) => {
    const [value, setValue] = useState(defaultValue);
    const eligibiteEnabled = isFeatureActivated(Features.EligibiliteHonneurs);

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
                {
                    eligibiteEnabled && <Tab disableRipple component="a" label="Éligibilité" />
                }
            </Tabs>
            <SuspenseNoSSR>
                {
                    value === 0 && <Membres />
                }
                {
                    value === 1 && <NominationsOverview />
                }
                {
                    value === 2 && <Eligibilite />
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