import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Logo from "../../images/Logo_AABP.gif"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div>
        <Link className="logo" to="/">
          <img src={Logo} alt="Logo"/>
        </Link>        
        <Link className="navlink" to="/inscrire">
          S'inscrire
        </Link>
        <Link className="navlink" to="/impliquer">
          S'impliquer
        </Link>
        
        <Link className="navlink" to="/contact">
          Nous joindre
        </Link>
        {
        // caroussel homepage
        // carte des groupes
        // catchy mission et branches
        // contact 
        }
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
