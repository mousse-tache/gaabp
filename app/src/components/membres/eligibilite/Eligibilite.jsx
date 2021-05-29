import React from "react";

import {  Paper } from '@material-ui/core';
import EligibiliteTable from "./EligibiliteTable";

import "./eligibilite.scss";

const Eligibilite = () => {  
    // select honor / formation, fetch users with matching criterias
    // criteres: annee de service + formations
    return  (
        <Paper>
            <EligibiliteTable />
        </Paper>
    );
};

export default Eligibilite;
