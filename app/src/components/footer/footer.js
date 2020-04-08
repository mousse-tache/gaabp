import React from "react"
import { Link } from "gatsby"
import "./footer.css"
import Logo from "../../images/Logo_AABP.gif"

const Footer = () => (
  <footer> 
          <p className="left-footer">
          <Link to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
          </p>
          <p className="center-footer">
          <Link to="/contact">
            Contact
          </Link>
          <a href="https://carrickquebec.com/" target="_blank">Carrick</a>
          </p>
          <p className="right-footer">            
          <h4>Suivez-nous</h4>
          <a href="https://www.youtube.com/channel/UCa0v0Pl2dQl1_tC-13MoKcg" target="_blank">Youtube</a>
          </p>
  </footer>
)

export default Footer
