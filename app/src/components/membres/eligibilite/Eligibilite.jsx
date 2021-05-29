import React, { useContext } from "react";

import AppContext from "@aabp/context/appContext";

import {  Paper } from '@material-ui/core';

import "./eligibilite.scss";

const Eligibilite = () => {  
    const { authedUser } = useContext(AppContext);

    // select honor / formation, fetch users with matching criterias
    // criteres: annee de service + formations
    return  (
        <Paper>
            Eligibilité aux honneurs, {authedUser.prenom} 
        </Paper>
    );
};

export default Eligibilite;
