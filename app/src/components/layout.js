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
import "./layout.css"

const Layout = ({ children, username }) => {

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#d95764',
        main: '#a3233a',
        dark: '#6e0015',
        contrastText: '#fff',
      },
      secondary: {
        light: '#fff961',
        main: '#edc62a',
        dark: '#b69600',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header username={username} siteTitle={"Section membres"} />
      <CssBaseline />
      <div>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  username: PropTypes.string
}

export default Layout
