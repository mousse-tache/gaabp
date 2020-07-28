import React from "react"
import { Link } from "gatsby"
import "./footer.css"
import Logo from "../../../images/Logo_AABP.png"

const Footer = () => (
  <footer> 
        <div>
          <Link to="/">
              <img className="logo" src={Logo} alt="Logo"/>
          </Link>
        </div>
        <div>        
          <Link to="#about">
            Qui sommes-nous?
          </Link>
        </div>
        <div>         
          <a href="https://carrickquebec.com/" target="_blank" rel="noopener noreferrer">Carrick (boutique)</a>
        </div>
        <div>
          <a href="https://www.canadahelps.org/fr/dn/3634" target="_blank" rel="noopener noreferrer">Faire un don</a>
        </div>
        <div>
          <a href="#">Retourner en haut</a>
        </div>
  </footer>
)

export default Footer
