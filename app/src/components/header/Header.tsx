import PropTypes from "prop-types";
import React, { useState } from "react";

import { AppBar, Toolbar } from "@material-ui/core";
import UserMenu from "./AccountMenu";
import Sidebar from "./Sidebar";

import "./header.scss";
import MenuButton from "./MenuButton";

const Header = () => {
  const [open, setOpen] = useState(window.innerWidth > 800);

  return (
    <header className="sticky">
      <Sidebar open={open} setOpen={setOpen} />
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          {!open && <MenuButton open={open} setOpen={setOpen} />}
          <UserMenu />
        </Toolbar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  username: PropTypes.string,
};

export default React.memo(Header);
