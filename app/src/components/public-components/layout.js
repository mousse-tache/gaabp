import React from "react"
import PropTypes from "prop-types"

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./header/header"
import Footer from "./footer/footer"
import "../layout.css"

const Layout = ({ children }) => {
  
  return (
    <>
      <Header />
      <CssBaseline />
      <div>
        <main>{children}</main>
        <Footer/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
