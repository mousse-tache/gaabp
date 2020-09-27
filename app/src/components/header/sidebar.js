import React, { useContext } from 'react';
import { Link } from "gatsby"
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import Logo from "../../images/Logo_AABP.png"
import UserContext from '../../context/userContext';
import Permissions from '../../auth/permissions';
import PermissionTypes from '../../auth/permissionTypes';
import MembresSidebar from './sidebars/membre-sidebar';
import ProgressionSidebar from './sidebars/progression-sidebar';

function Sidebar({tab}) {
  const { authedUser } = useContext(UserContext); 
  const canAccessMemberSection = Permissions(authedUser, PermissionTypes.ViewUsers);

  return (
    <Drawer

    anchor="left"
    open
    variant="persistent"
    className="sidebar"    
    >

      <Link
      style={{
        minWidth:"7rem"
      }}      
      className="logo" to="/" partiallyActive={true} activeClassName="active">
            <img src={Logo} alt="Logo"/>
      </Link>   

      {
        canAccessMemberSection && tab == 0 && <MembresSidebar />
      }   

      {
        canAccessMemberSection && tab == 1 && <ProgressionSidebar />
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
