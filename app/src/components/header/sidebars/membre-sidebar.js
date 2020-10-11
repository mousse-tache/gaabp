import React, { useContext } from 'react';
import { Link, navigate } from "gatsby"
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import QuickUnits from '../quickUnits';
import UserContext from '../../../context/userContext';
import Permissions from '../../../auth/permissions';
import PermissionTypes from '../../../auth/permissionTypes';

function MembresSidebar({}) {
  const { authedUser } = useContext(UserContext); 

  return (
    <div>
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
