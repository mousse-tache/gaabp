import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import "./header.css"
import Sidebar from "./sidebar"
import UserMenu from "./accountMenu";
import UserContext from "../../context/userContext";
import NouvelleNomination from "../nominations/nouvelle-nomination/nouvelleNomination"

const Header = ({ username }) => {
  const userContext = useContext(UserContext);
  const authedUser = userContext.authedUser;

  const canAccessMemberSection = authedUser?.nominations?.length > 0 || authedUser?.isAdmin;

  return (
    <header className="header sticky">          
          {canAccessMemberSection && 
          (
            <div className="morelinks">
              <div className="morelinks-items">
                <Link className="" to="/app/membres" partiallyActive={true} activeClassName="active">
                  Membres
                </Link>
              </div>
              <div className="morelinks-items">      
                <Link className="" to="/app/unites" partiallyActive={true} activeClassName="active">
                    Unités
                </Link>  
              </div >
              <div className="morelinks-items">     
                <Link className="" to="/app/groupes" partiallyActive={true} activeClassName="active">
                    Groupes
                </Link>  
              </div>
              <div className="morelinks-items">     
                <Link className="" to="/app/formation" partiallyActive={true} activeClassName="active">
                    Formations
                </Link>  
              </div>
            </div>
          )}  
          <NouvelleNomination />
          <UserMenu username={username} />
          <Sidebar />
    </header>
  )  
}

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
