import React from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "gatsby";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Help from "./Help";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { logout } from "@aabp/login/login";
import useAuthUser from "@aabp/auth/useAuthUser";
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

import "./account-menu.scss";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authedUser = useAuthUser();

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
        <div className="account-menu">
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
                    <Link to="/app/account">Mon profil</Link>
                </MenuItem>
                {
                    Permissions(PermissionTypes.FeatureManagement, authedUser) && 
                    <MenuItem onClick={handleClose}>
                        <Link to="/app/features">Fonctionnalités</Link>
                    </MenuItem> 
                }          
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
        </div>
    );
};

UserMenu.propTypes = {
    username: PropTypes.string
};

export default React.memo(UserMenu);