import React, { useState } from "react";
import { Typography, Paper, Tabs, Tab } from "@material-ui/core";
import "./ressources.css"
import Cotisation from "./cotisation";

const AccueilRessources = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <Paper className="accueil-ressources">
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="mainnav"
            className="ressources-nav"
             >
                <Tab disableRipple component="a" label="Cotisation" />
                <Tab disableRipple disabled component="a" label="Code d'éthique" />
            </Tabs>
            {
                value === 0 && <Cotisation />
            }
        </Paper>        
    );
};

export default AccueilRessources;