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
import { Button, Collapse, List, ListItem, ListItemText, Slide } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function Sidebar() {
  const { authedUser } = useContext(UserContext); 
  const canAccessMemberSection = Permissions(authedUser, PermissionTypes.ViewUsers);
  const [open, setOpen] = useState(true);

  if(!open) {
    return (
      <Button
      style={{ backgroundColor: 'transparent' }}
      className="logo"  onClick={() => setOpen(!open)} partiallyActive={true} activeClassName="active">
            <img src={Logo} style={{maxWidth: "3rem"}} alt="Logo"/>
            <MenuIcon className="mobile-only" />
      </Button>
    );
  }

  return (
    <Slide direction="right" in={open}>
      <Drawer
        anchor="left"
        open
        variant="permanent"
        className="sidebar"    
        >

          <Button
          style={{
            maxWidth:"7rem", textAlign: "center", backgroundColor: 'transparent' 
          }}      
          className="logo sidebar-logo header-nav" onClick={() => setOpen(!open)} partiallyActive={true} activeClassName="active">
                <img style={{maxWidth: "3rem"}} src={Logo} alt="Logo"/>
                <MenuIcon className="mobile-only" />
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
    </Slide>
    
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
