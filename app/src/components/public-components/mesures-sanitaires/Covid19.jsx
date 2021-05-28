import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';

import Mesures from "@aabp/docs/covid19/Mesures-camp-dété-camp-de-jour.pdf";
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
              <ListItemText primary="Avec les récentes annonces gouvernementales, la tenue de camps sera possible cet été à condition de respecter les mesures décrites dans le document suivant" /> 
          </ListItem>
          <ListItem 
            button 
            component="a" 
            rel="noopener noreferrer" 
            target="_blank" 
            href={Mesures}>
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
