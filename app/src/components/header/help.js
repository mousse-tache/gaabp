import React, { useState } from "react";
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Menu, MenuItem, IconButton, Dialog, DialogTitle } from "@material-ui/core";
import { logout } from "../../pages/login";
import Bottin from "../bottin/bottin";

const Help = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div onClick={() =>setOpen(true)}>
                Aide <IconButton>
                    <HelpOutlineIcon fontSize="large" color="primary" />
                </IconButton>
            </div>
            <Dialog open={open} onClose={() => {setOpen(false)}}>
                <DialogTitle>
                    Bottin
                </DialogTitle>
                <Bottin />
            </Dialog>
        </div>
    )

}

export default Help;