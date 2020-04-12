import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import Logo from "../../images/Logo_AABP.gif"

const Header = ({ siteTitle }) => (
  <header className="header sticky">
        <Link className="logo" to="/" partiallyActive={true} activeClassName="active">
          <img src={Logo} alt="Logo"/>
        </Link>        
        <Link className="navlink" to="#inscrire" partiallyActive={true} activeClassName="active">
          S'inscrire
        </Link>
        <Link className="navlink" to="#impliquer" partiallyActive={true} activeClassName="active">
          S'impliquer
        </Link>
        
        <Link className="navlink" to="#contact" partiallyActive={true} activeClassName="active">
          Nous joindre
        </Link>
        {
        // caroussel homepage
        // carte des groupes
        // catchy mission et branches
        // contact 
        }
        <Link to="/account" className="auth" >Membres</Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
