import React, { useEffect, useState } from "react";

import {  Chip, Paper } from '@material-ui/core';

import EligibliteContext from "@aabp/context/eligibiliteContext";
import EligibiliteTable from "./EligibiliteTable";

import "./eligibilite.scss";

const Eligibilite = () => {  
    // select honor / formation, fetch users with matching criterias
    // criteres: annee de service + formations
    const [buchettes, setBuchettes] = useState(false);
    const [magnacumLaude, setMagnacumLaude] = useState(false);
    const [provalore, setProvalore] = useState(false);
    const [snm, setSnm] = useState(false);

    const [honneurs, setHonneurs] = useState([]);

    useEffect(() => {
        setHonneurs({buchettes, magnacumLaude, provalore, snm});
    },[buchettes, magnacumLaude, provalore, snm]);

    return  (
        <EligibliteContext.Provider value={honneurs}>
            <Paper>
                <li className="eligibilite-list-chips">
                    <Chip className="eligibilite-chip" label="Bûchettes" onClick={() => setBuchettes(!buchettes)} color={buchettes ? "primary" : "default"} />
                    <Chip className="eligibilite-chip" label="Magna Cum Laude" onClick={() => setMagnacumLaude(!magnacumLaude)} color={magnacumLaude ? "primary" : "default"} />
                    <Chip className="eligibilite-chip" label="Pro Valore Sua" onClick={() => setProvalore(!provalore)} color={provalore ? "primary" : "default"} />
                    <Chip className="eligibilite-chip" label="Service national méritoire" onClick={() => setSnm(!snm)} color={snm ? "primary" : "default"} />
                </li>
                <EligibiliteTable />
            </Paper>
        </EligibliteContext.Provider>
    );
};

export default Eligibilite;