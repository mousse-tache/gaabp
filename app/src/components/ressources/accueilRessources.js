import React, { useState } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import "./ressources.css"
import Cotisation from "./cotisation";
import Reglements from "./reglements/reglements";

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
                <Tab disableRipple disabled component="a" label="Règlements" />
            </Tabs>
            {
                value === 0 && <Cotisation />
            }
            {
                value === 2 && <Reglements />
            }
        </Paper>        
    );
};

export default AccueilRessources;