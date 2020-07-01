import React from "react";
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { logout } from "../../pages/login";

const UserMenu = ({username}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
        <div className="auth">
            <IconButton onClick={handleClick}>
                <AccountCircleIcon fontSize="large" color="primary" />
            </IconButton>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/app/account">{username}</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
};

UserMenu.propTypes = {
    username: PropTypes.string
}

export default UserMenu;