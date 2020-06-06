import React from "react"
import { Link } from "gatsby"
import "./footer.css"
import Logo from "../../../images/Logo_AABP.gif"

const Footer = () => (
  <footer> 
          <div className="left-footer">
          <Link to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
          </div>
          <div className="center-footer">
          <Link to="#about">
            Qui sommes-nous?
          </Link>
          </div>
          <div className="right-footer">         
          <a href="https://carrickquebec.com/" target="_blank" rel="noopener noreferrer">Carrick (boutique)</a>
          </div>
  </footer>
)

export default Footer
