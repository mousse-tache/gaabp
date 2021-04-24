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

import Header from "./header/Header"
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
      tertiary: {
        light: '#808EC6',
        main: '#29335c',
        dark: '#262F54',
        contrastText: '#fff',
      },
      highlight: {
        light: '#8AD0BD',
        main: '#43AA8B',
        dark: '#173A30',
        contrastText: '#fff',
      },
      root: {
        textTransform: 'none',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Header username={username} siteTitle={"Section membres"} />
      <CssBaseline />
      <div>
        <main className="main-container">{children}</main>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  username: PropTypes.string
}

export default Layout
