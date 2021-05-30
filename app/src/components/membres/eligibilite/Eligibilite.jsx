import React, { useState } from "react";

import {  Chip, Paper } from '@material-ui/core';
import EligibiliteTable from "./EligibiliteTable";

import "./eligibilite.scss";

const Eligibilite = () => {  
    // select honor / formation, fetch users with matching criterias
    // criteres: annee de service + formations
    const [buchettes, setBuchettes] = useState(false);
    const [magnacumLaude, setMagnacumLaude] = useState(false);
    const [provalore, setProvalore] = useState(false);
    const [snm, setSnm] = useState(false);

    return  (
        <Paper>
            <li className="eligibilite-list-chips">
                <Chip className="eligibilite-chip" label="Bûchettes" onClick={() => setBuchettes(!buchettes)} color={buchettes ? "primary" : ""} />
                <Chip className="eligibilite-chip" label="Magna Cum Laude" onClick={() => setMagnacumLaude(!magnacumLaude)} color={magnacumLaude ? "secondary" : ""} />
                <Chip className="eligibilite-chip" label="Pro Valore Sua" onClick={() => setProvalore(!provalore)} color={provalore ? "primary" : ""} />
                <Chip className="eligibilite-chip" label="Service national méritoire" onClick={() => setSnm(!snm)} color={snm ? "secondary" : ""} />
            </li>
            <EligibiliteTable />
        </Paper>
    );
};

export default Eligibilite;