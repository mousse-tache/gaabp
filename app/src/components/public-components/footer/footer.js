import React from "react"
import { Link } from "gatsby"
import "./footer.css"
import Logo from "../../../images/Logo_AABP.gif"

const Footer = () => (
  <footer> 
          <p className="left-footer">
          <Link to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
          </p>
          <p className="center-footer">
          <Link to="/about">
            Qui sommes-nous?
          </Link>
          </p>
          <p className="right-footer">         
          <a href="https://carrickquebec.com/" target="_blank">Carrick (boutique)</a>
          </p>
  </footer>
)

export default Footer
