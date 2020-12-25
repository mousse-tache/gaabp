import React, { useState } from "react"

import { Tabs, Tab } from '@material-ui/core';

import FormationMembre from "../membres/formationMembre";
import NominationsMembres from "../membres/nominationsMembre";

const UserDetailsTabs = () => {
    const [tab, setTab] = useState(0);

    return (
        <div>
            <Tabs centered value={tab} onChange={(event, newValue) => setTab(newValue)} aria-label="simple tabs for user details">
                    <Tab label="Nominations" />
                    <Tab label="Formations" />
                    <Tab label="Médailles et distinctions" disabled />
                </Tabs>
                {tab === 0 && <NominationsMembres />}
                {tab === 1 && <FormationMembre />}  
        </div>
    );
};

export default UserDetailsTabs;