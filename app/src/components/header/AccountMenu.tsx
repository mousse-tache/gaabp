import { Menu, MenuItem } from "@material-ui/core";
import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import Help from "./Help";

import PermissionTypes from "@aabp/auth/permissionTypes";
import Permissions from "@aabp/auth/permissions";
import useAuthUser from "@aabp/auth/useAuthUser";
import { logout } from "@aabp/login/login";
import Button from "../design-system/Button/Button";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authedUser = useAuthUser();

  const { t } = useTranslation("menu");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-row absolute top-0 right-0 z-50 items-center h-full">
      <Help />
      <span>{Boolean(authedUser?.prenom) && authedUser?.prenom}</span>
      <div >
        <Button onClick={handleClick} color="ghost">
          <svg className="h-8 w-8" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor">
            <path strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </Button>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/app/account">{t("myProfile")}</Link>
        </MenuItem>
        {Permissions(PermissionTypes.FeatureManagement, authedUser) && (
          <MenuItem onClick={handleClose}>
            <Link to="/app/features">Fonctionnalités</Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  username: PropTypes.string,
};

export default React.memo(UserMenu);
