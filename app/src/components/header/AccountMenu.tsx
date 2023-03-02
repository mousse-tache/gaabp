import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import Help from "./Help";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import useAuthUser from "@aabp/auth/useAuthUser";
import { logout } from "@aabp/login/login";

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
    <div className="flex flex-row absolute top-0 right-0 z-50">
      <Help />
      <div>
        <span>{Boolean(authedUser?.prenom) && authedUser?.prenom}</span>
        <IconButton onClick={handleClick} color="primary">
          <AccountCircleIcon fontSize="large" color="inherit" />
        </IconButton>
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
