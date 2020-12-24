import React from "react"
import PropTypes from "prop-types"

import Sidebar from "./sidebar"
import UserMenu from "./accountMenu";
import NouvelleNomination from "../nominations/nouvelle-nomination/nouvelleNomination"

import "./header.css"

const Header = ({ username }) => {
  return (
    <header className="header sticky">    
          <div className="header-nav">
            <div>
              <Sidebar />
            </div>
            <div>
              <NouvelleNomination />
            </div>
            <div>
              <UserMenu username={username} />
            </div>
          </div>
    </header>
  )  
}

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
