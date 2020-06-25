import React from "react"
import { Link } from "gatsby"
import "./footer.css"
import Logo from "../../../images/Logo_AABP.gif"

const Footer = () => (
  <footer> 
        <div>
          <Link to="/">
              <img src={Logo} alt="Logo"/>
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
          <a href="https://www.canadahelps.org/fr/organismesdebienfaisance/association-des-aventuriers-de-baden-powell/" target="_blank" rel="noopener noreferrer">Faire un don</a>
        </div>
  </footer>
)

export default Footer
