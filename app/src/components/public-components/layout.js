/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

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
