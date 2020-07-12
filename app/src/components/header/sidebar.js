import React from 'react';
import { Link, navigate } from "gatsby"
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Logo from "../../images/Logo_AABP.gif"

function Sidebar({window, tab, canAccessMemberSection}) {

  return (
    <Drawer
    anchor="left"
    open
    variant="persistent"
    className="sidebar"    
    >

      <Link className="logo" to="/" partiallyActive={true} activeClassName="active">
            <img src={Logo} alt="Logo"/>
      </Link>   

      {
        canAccessMemberSection && tab == 0 && (
      <List>
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
      </List>
        )
      }
      {
        canAccessMemberSection && tab == 1 && (
      <List>
        <ListItem divider button disableRipple onClick={() => navigate("/app/formation")}>     
          <Link className="" to="/app/formation" partiallyActive={true} activeClassName="active">
              Formation
          </Link>  
        </ListItem>
      </List>
        )
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
