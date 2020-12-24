import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../../header/header.css"
import Logo from "../../../images/Logo_AABP.png"

const Header = () => (
  <header className="header headerpublic sticky">
    <div className="main-header collapsable">
      <Link className="navlink" to="/" partiallyActive={true} activeClassName="active">
          <img className="logo" src={Logo} alt="Logo"/>
        </Link>        
        <Link className="navlink" to="/#inscrire" partiallyActive={true} activeClassName="active">
          S'inscrire
        </Link>
        <Link className="navlink" to="/#impliquer" partiallyActive={true} activeClassName="active">
          S'impliquer
        </Link>
        
        <Link className="navlink" to="/#contact" partiallyActive={true} activeClassName="active">
          Nous joindre
        </Link>
        <a className="navlink lien-don" href="https://www.canadahelps.org/fr/dn/3634" target="_blank" rel="noopener noreferrer">Faire un don</a>
    </div>        
        <Link to="/app" className="auth collapsable" >Membres</Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
