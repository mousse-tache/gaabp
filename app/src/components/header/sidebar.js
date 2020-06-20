import React from 'react';
import { Link } from "gatsby"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Logo from "../../images/Logo_AABP.gif"

function Sidebar(props) {

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
      <List>
        <ListItem button divider>       
          <Link className="" to="/app/membres" partiallyActive={true} activeClassName="active">
              Membres
          </Link>  
        </ListItem>
        <ListItem button divider>      
          <Link className="" to="/app/unites" partiallyActive={true} activeClassName="active">
              Unités
          </Link>  
        </ListItem>
        <ListItem button divider>     
          <Link className="" to="/app/groupes" partiallyActive={true} activeClassName="active">
              Groupes
          </Link>  
        </ListItem>
      </List>
    </Drawer>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
