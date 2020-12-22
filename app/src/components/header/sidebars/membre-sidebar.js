import React, { useContext, useState } from 'react';
import { Link, navigate } from "gatsby"
import PropTypes from 'prop-types';

import QuickUnits from '../quickUnits';
import UserContext from '@aabp/context/userContext';
import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function MembresSidebar({}) {
  const { authedUser } = useContext(UserContext); 

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
            Permissions(authedUser, PermissionTypes.ViewRecensementSummary) && (
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
}

MembresSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  tab: PropTypes.number,
  canAccessMemberSection: PropTypes.bool
};

export default MembresSidebar;
