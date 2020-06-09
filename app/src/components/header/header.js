import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Logo from "../../images/Logo_AABP.gif"

const Header = ({ username }) => (
  <header className="header sticky">
        <Link className="logo" to="/" partiallyActive={true} activeClassName="active">
          <img src={Logo} alt="Logo"/>
        </Link>                
        <Link className="navlink" to="/app/membres" partiallyActive={true} activeClassName="active">
          Liste de membres
        </Link>       
        <Link className="navlink" to="/app/account" partiallyActive={true} activeClassName="active">
          Unités
        </Link>
        <Link className="navlink" to="/app/account" partiallyActive={true} activeClassName="active">
          Groupes
        </Link>
        <Link to="/app/account" className="auth" >{username}</Link>
  </header>
)

Header.propTypes = {
  username: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
