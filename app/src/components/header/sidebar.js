import React, { useContext, useState } from 'react';
import { navigate } from "gatsby"
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import Logo from "@aabp/images/Logo_AABP.png"
import UserContext from '@aabp/context/userContext';
import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';
import MembresSidebar from './sidebars/membre-sidebar';
import ProgressionSidebar from './sidebars/progression-sidebar';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';

function Sidebar() {
  const { authedUser } = useContext(UserContext); 
  const canAccessMemberSection = Permissions(authedUser, PermissionTypes.ViewUsers);
  const [open, setOpen] = useState(true);

  return (
    <Drawer
    anchor="left"
    open={true}
    variant="persistent"
    className="sidebar"    
    >

      <Button
      style={{
        minWidth:"7rem"
      }}      
      className="logo" onClick={() => setOpen(!open)} partiallyActive={true} activeClassName="active">
            <img src={Logo} alt="Logo"/>
      </Button>

      {
        canAccessMemberSection && <ProgressionSidebar />
      }
      <List>
        <ListItem divider button disableRipple onClick={() => navigate("/app/ressources")}>             
          <ListItemText primary="Ressources" />
        </ListItem>
      </List>
      {
        canAccessMemberSection && <MembresSidebar />
      }
    </Drawer>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  tab: PropTypes.number,
  canAccessMemberSection: PropTypes.bool
};

export default Sidebar;
