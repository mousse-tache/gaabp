import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';

import "./covid19.scss";

const Covid19 = () => (
  <section className="wrapper covid19">
    <div className="full-bleed">        
      <Typography variant="h5" gutterBottom>
        Mesures sanitaires en camp d'été 
      </Typography>
      <List>
          <ListItem>          
              <ListItemIcon>
                <HealingIcon color="primary" /> 
              </ListItemIcon>
              <ListItemText primary="Voici les dernières mesures en vigueur par rapport à la Covid-19 (2021-01-31)" /> 
          </ListItem>
          <ListItem 
            button 
            component="a" 
            rel="noopener noreferrer" 
            target="_blank" 
            href={"/assets/2022-01-30_mesures-covid-19.pdf"}>
            <ListItemIcon>
                <HealingIcon color="primary"/> 
              </ListItemIcon>
            <ListItemText primary="Mesures sanitaires (pdf)" />
          </ListItem>
      </List>
    </div>
    <div className="full-bleed">
    </div>
  </section>
);

export default React.memo(Covid19);
