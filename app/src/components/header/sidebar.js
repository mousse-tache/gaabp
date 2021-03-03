import React, { useState, useContext } from 'react';
import { navigate } from "gatsby"
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import Logo from "@aabp/images/Logo_AABP.png";
import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';
import MembresSidebar from './sidebars/membre-sidebar';
import ProgressionSidebar from './sidebars/progression-sidebar';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NouvelleNomination from '@aabp/components/nominations/nouvelle-nomination/nouvelleNomination';
import AppContext from '@aabp/context/appContext';

const Sidebar = ({open, setOpen}) => {
  const { authedUser } = useContext(AppContext);

  const MenuButton = () => {
    return (
      <Button
      style={{ backgroundColor: 'transparent' }}
      className="logo sidebar-logo"  onClick={() => setOpen(!open)}>
            <img src={Logo} style={{maxWidth: "3rem"}} alt="Logo"/>
            <MenuIcon className="mobile-only" />
      </Button>
    );
  };

  const canAccessMemberSection = Permissions(PermissionTypes.ViewUsers, authedUser);
  
  return (
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        className="sidebar"    
        >
          <List>
            <ListItem alignItems="center">
              <MenuButton />
            </ListItem>
          </List>

          <List>
            <ListItem button disableRipple onClick={() => navigate("/app")}>  
              <HomeIcon />           
              <ListItemText primary="Accueil" />
            </ListItem>
          </List>
          <ProgressionSidebar />
          <List>
            <ListItem divider button disableRipple onClick={() => navigate("/app/ressources")}>             
              <ListItemText primary="Ressources" />
            </ListItem>
          </List>
          {
            canAccessMemberSection && <MembresSidebar />
          }
          <List>
            <ListItem>
              <NouvelleNomination />
            </ListItem>
          </List>
      </Drawer>    
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default Sidebar;
