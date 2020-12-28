import React, { useState } from "react"

import { Tabs, Tab } from '@material-ui/core';

import FormationMembre from "./formationMembre";
import NominationsMembres from "./nominationsMembre";
import ReconnaissancesMembre from "./ReconnaissancesMembre";

const UserDetailsTabs = () => {
    const [tab, setTab] = useState(0);

    return (
        <div>
            <Tabs 
            value={tab}
            variant="scrollable"
            scrollButtons="auto"
            onChange={(event, newValue) => setTab(newValue)} aria-label="simple tabs for user details">
                <Tab label="Nominations" />
                <Tab label="Formations" />
                <Tab label="Médailles et distinctions" />
            </Tabs>
            {tab === 0 && <NominationsMembres />}
            {tab === 1 && <FormationMembre />}  
            {tab === 2 && <ReconnaissancesMembre />}
        </div>
    );
};

export default UserDetailsTabs;