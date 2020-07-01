import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Sidebar from "./sidebar"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tabs, Tab } from "@material-ui/core"; 
import UserMenu from "./accountMenu";

const Header = ({ username }) => {
  const [value, setValue] = React.useState(0);
  const tabValue = ["/app/membres", "/app", "/app"];

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
    navigate(tabValue[newValue]);
  };

  return (
    <header className="header sticky">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="mainnav"
            className="tabnav"
          >
            <Tab disableRipple component="a" label="Membres" />
            <Tab disableRipple disabled component="a" label="Ressources" />
            <Tab disableRipple disabled component="a" label="Progression" />
          </Tabs>
          <Link className="navlink morelinks" to="/app/membres" partiallyActive={true} activeClassName="active">
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
          <Link className="navlink morelinks" to="/app/membres" partiallyActive={true} activeClassName="active">
            Documents
          </Link>      
          <UserMenu username={username} />
          <Sidebar tab={value} />
    </header>
  )  
}

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
