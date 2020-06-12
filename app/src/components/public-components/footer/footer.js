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
  </footer>
)

export default Footer
