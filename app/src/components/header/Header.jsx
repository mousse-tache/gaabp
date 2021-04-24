import React, { useState } from "react"
import PropTypes from "prop-types"

import Sidebar from "./Sidebar"
import UserMenu from "./AccountMenu";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import Logo from "@aabp/images/Logo_AABP.png";
import "./header.scss"

const Header = ({ username }) => {
  const MenuButton = () => {
    return (
      <Button
      style={{ backgroundColor: 'transparent' }} 
      color="inherit"
      className="logo sidebar-logo"  onClick={() => setOpen(!open)}>
            <img src={Logo} style={{maxWidth: "3rem"}} alt="Logo"/>
            <MenuIcon className="mobile-only" />
      </Button>
    );
  };
  const [open, setOpen] = useState(window.innerWidth > 800);

  return (
    <header className="sticky"> 
      <Sidebar open={open} setOpen={setOpen} />
      <AppBar
        position="fixed"
        color="inherit">
          <Toolbar>
            {!open && <MenuButton /> }
            <UserMenu username={username} />
          </Toolbar>
      </AppBar>
    </header>
  )  
}

Header.propTypes = {
  username: PropTypes.string,
}

export default Header
