import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import "./header.css"
import Sidebar from "./sidebar"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tabs, Tab, Button } from "@material-ui/core"; 
import UserMenu from "./accountMenu";
import UserContext from "../../context/userContext";

const Header = ({ username }) => {
  const [value, setValue] = React.useState(0);
  const tabValue = ["/app/membres", "/app", "/app"];
  const userContext = useContext(UserContext);
  const authedUser = userContext.authedUser;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
    navigate(tabValue[newValue]);
  };

  const canAccessMemberSection = authedUser?.nominations?.length > 0;

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
            <Tab disableRipple disabled={!canAccessMemberSection} component="a" label="Membres" />
            <Tab disableRipple disabled component="a" label="Ressources" />
            <Tab disableRipple disabled component="a" label="Progression" />
          </Tabs>
          {canAccessMemberSection && 
          (
            <List className="morelinks">
              <ListItem>
                <Link className="" to="/app/membres" partiallyActive={true} activeClassName="active">
                  Membres
                </Link>
              </ListItem>
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
          )}  
          <Button className="header-nomination-button" variant="contained" color="secondary" href="https://docs.google.com/forms/d/e/1FAIpQLSclYn8ZnDRxk--1hfCz4m3JXx8mHv7ke0S7HGIavlt6MnzsQA/viewform?usp=pp_url" target="_blank" rel="noopener noreferrer">
            Demande de nomination
          </Button>
          <UserMenu username={username} />
          <Sidebar tab={value} canAccessMemberSection={canAccessMemberSection} />
    </header>
  )  
}

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
