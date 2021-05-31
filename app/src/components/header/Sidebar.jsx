import React, { useContext } from 'react';
import { navigate } from "gatsby";
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import Logo from "@aabp/images/Logo_AABP.png";
import Permissions from '@aabp/auth/permissions';
import PermissionTypes from '@aabp/auth/permissionTypes';
import MembresSidebar from './sidebars/MembresSidebar';
import ProgressionSidebar from './sidebars/ProgressionSidebar';
import { Badge, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NouvelleNomination from '@aabp/components/nominations/nouvelle-nomination/NouvelleNomination';
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
        >
          <div className="sidebar">            
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
              
              <Badge color="primary" badgeContent="AGA" 
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}>
                <ListItem divider button disableRipple onClick={() => navigate("/app/ressources")}>  
                    <Typography>Ressources</Typography>            
                </ListItem>
              </Badge> 
            </List>
            {
              canAccessMemberSection && <MembresSidebar />
            }
            <List>
              <ListItem>
                <NouvelleNomination />
              </ListItem>
            </List>
          </div>
      </Drawer>    
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default Sidebar;
