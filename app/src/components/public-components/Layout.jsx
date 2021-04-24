import React from "react";
import PropTypes from "prop-types";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

import Header from "./header/Header";
import Footer from "./footer/Footer";
import "../layout.css";

const Layout = ({ children }) => {

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
      root: {
        textTransform: 'none',
      }
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <CssBaseline />
      <div>
        <main>{children}</main>
        <Footer/>
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
