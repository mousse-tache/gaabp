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
          <Link to="/about">
            Qui sommes-nous?
          </Link>
          <a href="https://carrickquebec.com/" target="_blank">Carrick (boutique)</a>
          </p>
          <p className="right-footer">            
          <h4>Suivez-nous</h4>
          <a href="https://www.youtube.com/channel/UCa0v0Pl2dQl1_tC-13MoKcg" target="_blank">YouTube</a>
          </p>
  </footer>
)

export default Footer
