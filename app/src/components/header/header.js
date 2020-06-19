import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Sidebar from "./sidebar"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Header = ({ username }) => (
  <header className="header sticky">
        <Link className="navlink" to="/app/membres" partiallyActive={true} activeClassName="active">
          Membres
        </Link>
        <List className="morelinks">
          <ListItem>      
            <Link className="" to="/app/unites" partiallyActive={true} activeClassName="active">
                Unités
            </Link>  
          </ListItem>
          <ListItem>     
            <Link className="" to="/app/groupes" partiallyActive={true} activeClassName="active">
                Groupes
            </Link>  
          </ListItem>
        </List>  
        <Link className="navlink" to="/app/membres" partiallyActive={true} activeClassName="active">
          Documents
        </Link>      
        <Link to="/app/account" className="auth" >{username}</Link>
        <Sidebar />
  </header>
)

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
