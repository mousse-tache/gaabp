import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Logo from "../../images/Logo_AABP.gif"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div>
        <Link to="/">
          <img src={Logo}/> {siteTitle}
        </Link>
        <Link to="/account"  className="auth">Membres</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
