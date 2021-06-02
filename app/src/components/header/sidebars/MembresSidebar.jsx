import React, { useContext, useState } from 'react';
import { Link, navigate } from "gatsby";

import QuickUnits from '../QuickUnits';
import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AppContext from '@aabp/context/app/appContext';

const MembresSidebar = () => {
  const { authedUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <List>
        <ListItem button onClick={() => setOpen(!open)}>          
          <ListItemText primary="Gestion" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>          
          <ListItem divider button disableRipple onClick={() => navigate("/app/membres")}>       
            <Link className="" to="/app/membres" partiallyActive={true} activeClassName="active">
                Membres
            </Link>  
          </ListItem>
          <ListItem divider button disableRipple onClick={() => navigate("/app/unites")}>      
            <Link className="" to="/app/unites" partiallyActive={true} activeClassName="active">
                Unités
            </Link>  
          </ListItem>
          <ListItem divider button disableRipple onClick={() => navigate("/app/groupes")}>     
            <Link className="" to="/app/groupes" partiallyActive={true} activeClassName="active">
                Groupes
            </Link>  
          </ListItem>
          {
            Permissions(PermissionTypes.ViewRecensementSummary, authedUser) && (
            <ListItem divider button disableRipple onClick={() => navigate("/app/recensements")}>     
              <Link className="" to="/app/recensements" partiallyActive={true} activeClassName="active">
                  Recensements
              </Link>  
            </ListItem>
              )
          }
          <ListItem divider button disableRipple onClick={() => navigate("/app/nominations")}>     
            <Link className="" to="/app/nominations" partiallyActive={true} activeClassName="active">
                Nominations
            </Link>  
          </ListItem>
        </List>
      </Collapse>

      </List>
      <QuickUnits />
    </div>
  );
};

export default MembresSidebar;
